import UserModel from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ role: "user" });

    return res.status(200).json({success:true, users });
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
      { new: true }
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