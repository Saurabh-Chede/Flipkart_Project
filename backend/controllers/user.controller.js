import UserModel from "../models/user.model.js";

export const updateUserProfile = async (req,res) => {}

export const deleteUserProfile = async (req,res) => {};

export const addToCart = async (req,res) => {};

export const getCartProducts = async (req,res) => {};

export const applyCoupon = async (req,res) => {};

export const placeOrder = async (req,res) => {};

export const getUserOrders = async (req,res) => {};

export const applyForSeller = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "seller") {
      return res.status(400).json({
        success: false,
        message: "Already a seller",
      });
    }

    user.sellerRequestStatus = "pending";

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Seller request submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



