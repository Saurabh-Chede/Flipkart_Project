import UserModel from "../models/user.model.js";
import SellerModel from "../models/seller.model.js";
import ProductModel from "../models/product.model.js";
import OrderModel from "../models/order.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ role: "user" });

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.log("Error fetching users:", error);
    return res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findById(id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllSellers = async (req, res) => {
  try {
    const sellers = await UserModel.find({ role: "seller" });

    return res.status(200).json({ success: true, sellers });
  } catch (error) {
    console.log("Error fetching sellers:", error);
    return res
      .status(500)
      .json({ message: "Error fetching sellers", error: error.message });
  }
};

export const approveSeller = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      {
        role: "seller",
        sellerRequestStatus: "approved",
      },
      { new: true },
    );

    return res.status(200).json({
      success: true,
      message: "Seller approved",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const rejectSeller = async (req, res) => {
  try {
    const { userId } = req.params;

    await UserModel.findByIdAndUpdate(userId, {
      sellerRequestStatus: "rejected",
    });

    return res.status(200).json({
      success: true,
      message: "Seller request rejected",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSellerRequests = async (req, res) => {
  try {
    const requests = await UserModel.find({
      sellerRequestStatus: "pending",
    }).select("name email sellerRequestStatus");

    return res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalSellers,
      totalProducts,
      totalOrders,
      orderStatusData,
      topProducts,
      monthlySales,
      recentOrders,
      lowStock,
      topCategories,
    ] = await Promise.all([
      UserModel.countDocuments({ role: "user" }),
      UserModel.countDocuments({ role: "seller" }),
      ProductModel.countDocuments(),
      OrderModel.countDocuments(),

      // Order Status Counts
      OrderModel.aggregate([
        {
          $group: {
            _id: "$orderStatus",
            count: { $sum: 1 },
          },
        },
      ]),

      // Top Selling Products
      OrderModel.aggregate([
        {
          $match: {
            orderStatus: "DELIVERED",
          },
        },
        {
          $unwind: "$items",
        },
        {
          $group: {
            _id: "$items.product",
            name: { $first: "$items.title" },
            totalSold: { $sum: "$items.quantity" },
          },
        },
        {
          $sort: {
            totalSold: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            _id: 0,
            name: 1,
            value: "$totalSold",
          },
        },
      ]),

      OrderModel.aggregate([
        {
          $match: {
            orderStatus: "DELIVERED",
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            sales: { $sum: "$pricing.grandTotal" },
          },
        },
        {
          $sort: {
            _id: 1,
          },
        },
      ]),

      OrderModel.find()
        .populate("user", "name")
        .select(
          "orderNumber user items orderStatus paymentStatus pricing.grandTotal createdAt",
        )
        .sort({ createdAt: -1 })
        .limit(5),

      ProductModel.find({
        stock: { $lte: 5 },
      })
        .select("name stock")
        .sort({ stock: 1 })
        .limit(10),

      OrderModel.aggregate([
        {
          $match: {
            orderStatus: "DELIVERED",
          },
        },
        {
          $unwind: "$items",
        },
        {
          $lookup: {
            from: "products",
            localField: "items.product",
            foreignField: "_id",
            as: "product",
          },
        },
        {
          $unwind: "$product",
        },
        {
          $group: {
            _id: "$product.category",
            value: {
              $sum: "$items.quantity",
            },
          },
        },
        {
          $sort: {
            value: -1,
          },
        },
        {
          $limit: 5,
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            value: 1,
          },
        },
      ]),
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlySalesData = months.map((month, index) => {
      const found = monthlySales.find((item) => item._id === index + 1);

      return {
        month,
        sales: found ? found.sales : 0,
      };
    });

    const statusMap = {
      PLACED: 0,
      CONFIRMED: 0,
      PACKED: 0,
      SHIPPED: 0,
      DELIVERED: 0,
      CANCELLED: 0,
    };

    orderStatusData.forEach((item) => {
      statusMap[item._id] = item.count;
    });

    res.status(200).json({
      success: true,

      stats: {
        totalUsers,
        totalSellers,
        totalProducts,
        totalOrders,
      },

      orderStatus: [
        { status: "Placed", count: statusMap.PLACED },
        { status: "Confirmed", count: statusMap.CONFIRMED },
        { status: "Packed", count: statusMap.PACKED },
        { status: "Shipped", count: statusMap.SHIPPED },
        { status: "Delivered", count: statusMap.DELIVERED },
        { status: "Cancelled", count: statusMap.CANCELLED },
      ],

      topProducts,
      monthlySales: monthlySalesData,
      recentOrders,
      lowStock,
      topCategories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .populate("seller", "name")
      .sort({ createdAt: -1 });

    const totalRevenue = products.reduce((acc, product) => {
      return acc + (product.totalSold || 0) * product.price;
    }, 0);

    const lowStockCount = products.filter(
      (product) => product.stock < 20,
    ).length;

    const formattedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      image: product.image,
      category: product.category,
      seller: product.seller?.name,
      price: product.price,
      stock: product.stock,
      rating: product.ratings,
      reviews: product.numReviews,
      sold: product.totalSold || 0,
      revenue: (product.totalSold || 0) * product.price,
    }));

    res.status(200).json({
      success: true,

      summary: {
        totalProducts: products.length,
        totalRevenue,
        lowStockCount,
      },

      products: formattedProducts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("user", "name")
      .sort({ createdAt: -1 });

    const totalRevenue = orders
      .filter((order) => order.orderStatus === "DELIVERED")
      .reduce((acc, order) => acc + order.pricing.grandTotal, 0);

    const deliveredOrders = orders.filter(
      (order) => order.orderStatus === "DELIVERED"
    ).length;

    const pendingOrders = orders.filter(
      (order) => order.orderStatus !== "DELIVERED" &&
                 order.orderStatus !== "CANCELLED"
    ).length;

    res.json({
      success: true,

      summary: {
        totalOrders: orders.length,
        deliveredOrders,
        pendingOrders,
        totalRevenue,
      },

      orders: orders.map((order) => ({
        _id: order._id,
        orderNumber: order.orderNumber,
        customer: order.user?.name,
        products: order.items.length,
        amount: order.pricing.grandTotal,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: order.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
