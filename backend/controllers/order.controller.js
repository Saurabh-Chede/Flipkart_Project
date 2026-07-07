import OrderModel from "../models/order.model.js";
import SellerOrderModel from "../models/sellerorder.model.js";
import ProductModel from "../models/product.model.js";
import CartModel from "../models/cart.model.js";
import AddressModel from "../models/address.model.js";
import { calculateDiscountedPrice } from "../utils/priceUtils.js";

const generateOrderNumber = () => {
  return `ORD-${Date.now()}`;
};

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const { shippingAddressId } = req.body;

    const address = await AddressModel.findById(shippingAddressId);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    const cart = await CartModel.findOne({ user: userId }).populate({
      path: "items.product",
      populate: {
        path: "seller",
      },
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let itemsTotal = 0;

    const orderItems = cart.items.map((item) => {
      const discountPercentage = item.product.discountPercentage || 0;

      const finalPrice = calculateDiscountedPrice(
        item.product.price,
        discountPercentage,
      );

      const total = finalPrice * item.quantity;

      itemsTotal += total;

      return {
        product: item.product._id,
        seller: item.product.seller._id,

        title: item.product.name,
        image: item.product.image,

        originalPrice: item.product.price,
        discountPercentage: discountPercentage,

        price: finalPrice,

        quantity: item.quantity,

        totalPrice: total,
      };
    });

    const deliveryCharge = itemsTotal > 500 ? 0 : 40;

    const grandTotal = itemsTotal + deliveryCharge;

    const order = await OrderModel.create({
      orderNumber: generateOrderNumber(),

      user: userId,

      shippingAddress: shippingAddressId,

      items: orderItems,

      pricing: {
        itemsTotal,
        discount: 0,
        deliveryCharge,
        grandTotal,
      },
    });

    // ==========================
    // Create Seller Orders
    // ==========================

    const sellerMap = {};

    for (const item of orderItems) {
      const sellerId = item.seller.toString();

      if (!sellerMap[sellerId]) {
        sellerMap[sellerId] = [];
      }

      sellerMap[sellerId].push(item);
    }

    for (const sellerId in sellerMap) {
      const sellerItems = sellerMap[sellerId];

      const totalAmount = sellerItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      await SellerOrderModel.create({
        order: order._id,

        seller: sellerId,

        user: userId,

        items: sellerItems.map((item) => ({
          product: item.product,

          title: item.title,
          image: item.image,

          price: item.price,
          quantity: item.quantity,

          totalPrice: item.price * item.quantity,
        })),

        totalAmount,
        status: "PLACED",
        payoutStatus: "PENDING",
      });
    }

    // ==========================
    // Update Stock
    // ==========================

    for (const item of cart.items) {
      await ProductModel.findByIdAndUpdate(item.product._id, {
        $inc: {
          stock: -item.quantity,
        },
      });
    }

    // ==========================
    // Clear Cart
    // ==========================

    cart.items = [];

    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({
      user: req.userId,
    })
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate("shippingAddress")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.orderStatus === "SHIPPED" || order.orderStatus === "DELIVERED") {
      return res.status(400).json({
        success: false,
        message: "Order cannot be cancelled",
      });
    }

    order.orderStatus = "CANCELLED";

    await order.save();

    await SellerOrderModel.updateMany(
      { order: order._id },
      {
        status: "CANCELLED",
      },
    );

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, paymentMethod } = req.body;

    const order = await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        paymentStatus,
        paymentMethod,
      },
      { new: true },
    );

    // 🔥 IMPORTANT: sync seller orders
    if (paymentStatus === "PAID") {
      await SellerOrderModel.updateMany(
        { order: req.params.id },
        {
          payoutStatus: "PAID",
        },
      );
    }

    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
