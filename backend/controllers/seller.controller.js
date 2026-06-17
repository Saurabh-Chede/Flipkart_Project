import ProductModel from "../models/product.model.js";
import SellerModel from "../models/seller.model.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image, category, stock } = req.body;

    if (
      !name ||
      !price ||
      !description ||
      !image ||
      !category ||
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

export const deleteSellerProduct = async (req, res) => {};

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
