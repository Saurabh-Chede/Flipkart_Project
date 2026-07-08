import ProductModel from "../models/product.model.js";
import SellerModel from "../models/seller.model.js";
import OrderModel from "../models/order.model.js";
import SellerOrderModel from "../models/sellerorder.model.js";
import mongoose from "mongoose";

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      discountPercentage,
      image,
      category,
      stock,
    } = req.body;

    if (
      !name ||
      !price ||
      !description ||
      !image ||
      !category ||
      !discountPercentage ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const product = await ProductModel.create({
      name,
      price,
      discountPercentage,
      description,
      image,
      category,
      stock,
      seller: req.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellerProducts = async (req, res) => {
  try {
    const userId = req.userId;

    const products = await ProductModel.find({
      seller: userId,
    }).populate("seller", "name email");

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSellerProduct = async (req, res) => {
  try {
    const userId = req.userId; // JWT middleware se aa raha hai
    const { productId } = req.params;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check product ownership
    if (product.seller.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this product",
      });
    }

    await ProductModel.findByIdAndDelete(productId);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });

  } catch (error) {
    console.log("Delete Seller Product Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateSellerProduct = async (req, res) => {};

export const completeSellerProfile = async (req, res) => {
  try {
    const {
      shopName,
      gstNumber,
      panNumber,
      phone,
      businessEmail,
      address,
      storeLogo,
      bankDetails,
    } = req.body;

    const existingProfile = await SellerModel.findOne({
      user: req.userId,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Seller profile already exists",
      });
    }

    const sellerProfile = await SellerModel.create({
      user: req.userId,
      shopName,
      gstNumber,
      panNumber,
      phone,
      businessEmail,
      address,
      storeLogo,
      bankDetails,
    });

    return res.status(201).json({
      success: true,
      message: "Seller profile completed successfully",
      sellerProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSellerProfile = async (req, res) => {
  try {
    const sellerProfile = await SellerModel.findOneAndUpdate(
      {
        user: req.userId,
      },
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!sellerProfile) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Seller profile updated successfully",
      sellerProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellerProfile = async (req, res) => {
  try {
    const sellerProfile = await SellerModel.findOne({
      user: req.userId,
    }).populate("user", "name email");

    if (!sellerProfile) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      sellerProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellerDashboardStats = async (req, res) => {
  try {
    const sellerId = new mongoose.Types.ObjectId(req.userId);

    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );

    const [
      totalProducts,
      outOfStockProducts,
      orderStats,
      revenueStats,
      monthlyRevenueStats,
      customers,
    ] = await Promise.all([
      // 📦 Total Products
      ProductModel.countDocuments({ seller: sellerId }),

      // ⚠️ Out of stock products
      ProductModel.countDocuments({
        seller: sellerId,
        stock: { $lte: 0 },
      }),

      // 📊 Order Stats
      SellerOrderModel.aggregate([
        {
          $match: { seller: sellerId },
        },
        {
          $group: {
            _id: null,

            totalOrders: { $sum: 1 },

            placedOrders: {
              $sum: { $cond: [{ $eq: ["$status", "PLACED"] }, 1, 0] },
            },

            confirmedOrders: {
              $sum: { $cond: [{ $eq: ["$status", "CONFIRMED"] }, 1, 0] },
            },

            packedOrders: {
              $sum: { $cond: [{ $eq: ["$status", "PACKED"] }, 1, 0] },
            },

            shippedOrders: {
              $sum: { $cond: [{ $eq: ["$status", "SHIPPED"] }, 1, 0] },
            },

            deliveredOrders: {
              $sum: { $cond: [{ $eq: ["$status", "DELIVERED"] }, 1, 0] },
            },

            cancelledOrders: {
              $sum: { $cond: [{ $eq: ["$status", "CANCELLED"] }, 1, 0] },
            },
          },
        },
      ]),

      // 💰 Total Revenue (ONLY DELIVERED)
      SellerOrderModel.aggregate([
        {
          $match: {
            seller: new mongoose.Types.ObjectId(sellerId),
            payoutStatus: "PAID",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ]),

      // 📅 Monthly Revenue (ONLY DELIVERED)
      SellerOrderModel.aggregate([
        {
          $match: {
            seller: new mongoose.Types.ObjectId(sellerId),
            payoutStatus: "PAID",
            createdAt: { $gte: startOfMonth },
          },
        },
        {
          $group: {
            _id: null,
            monthlyRevenue: { $sum: "$totalAmount" },
          },
        },
      ]),

      // 👥 Unique Customers
      SellerOrderModel.distinct("user", {
        seller: sellerId,
      }),
    ]);

    const stats = orderStats[0] || {};
    const revenue = revenueStats[0] || {};
    const monthly = monthlyRevenueStats[0] || {};

    return res.status(200).json({
      success: true,

      stats: {
        totalProducts,
        outOfStockProducts,

        totalOrders: stats.totalOrders || 0,
        placedOrders: stats.placedOrders || 0,
        confirmedOrders: stats.confirmedOrders || 0,
        packedOrders: stats.packedOrders || 0,
        shippedOrders: stats.shippedOrders || 0,
        deliveredOrders: stats.deliveredOrders || 0,
        cancelledOrders: stats.cancelledOrders || 0,

        totalRevenue: revenue.totalRevenue || 0,
        monthlyRevenue: monthly.monthlyRevenue || 0,

        totalCustomers: customers.length,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellerRecentOrders = async (req, res) => {
  try {
    const sellerId = req.userId;

    const orders = await SellerOrderModel.find({
      seller: sellerId,
    })
      .populate("user", "name email")
      .populate("items.product", "name image")
      .sort({ createdAt: -1 })
      .limit(5);

    const formatted = orders.map((order) => {
      const firstItem = order.items[0];

      return {
        id: order.order,
        customer: order.user?.name || "Guest",
        product: firstItem?.title || firstItem?.product?.name,
        status: order.status,
        payment: order.payoutStatus,
      };
    });

    res.json({
      success: true,
      orders: formatted,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellerLowStock = async (req, res) => {
  try {
    const sellerId = req.userId;

    const threshold = Number(req.query.threshold) || 5;

    const products = await ProductModel.find({
      seller: sellerId,
      stock: { $lte: threshold },
    }).sort({ stock: 1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellerOrders = async (req, res) => {
  try {
    const orders = await SellerOrderModel.find({
      seller: req.userId,
    })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSellerOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const sellerOrder = await SellerOrderModel.findOne({
      _id: req.params.id,
      seller: req.userId,
    });

    if (!sellerOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const previousStatus = sellerOrder.status;
    sellerOrder.status = status;

    if (status === "DELIVERED") {
      sellerOrder.deliveredAt = new Date();
      sellerOrder.payoutStatus = "PAID";
    }

    await sellerOrder.save();

    if (previousStatus !== "DELIVERED" && status === "DELIVERED") {
      for (const item of sellerOrder.items) {
        await ProductModel.findByIdAndUpdate(item.product, {
          $inc: {
            totalSold: item.quantity,
          },
        });
      }
    }

    // User Order sync
    await OrderModel.findByIdAndUpdate(sellerOrder.order, {
      orderStatus: status,
    });

    res.json({
      success: true,
      sellerOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellerOrderById = async (req, res) => {
  try {
    const order = await SellerOrderModel.findOne({
      _id: req.params.id,
      seller: req.userId,
    })
      .populate("user", "name email")
      .populate("order")
      .populate("items.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
