import ProductModel from "../models/product.model.js";

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
