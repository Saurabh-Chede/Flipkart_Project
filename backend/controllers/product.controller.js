import ProductModel from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();
    res.status(200).json({
      message: "All products fetched successfully",
      products,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {};

export const deleteProduct = async (req, res) => {};

export const searchProducts = async (req, res) => {};

export const filterProducts = async (req, res) => {};

export const getPaginatedProducts = async (req, res) => {};

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await ProductModel.find({ category });

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTopDeals = async (req, res) => {
  try {
    const products = await ProductModel.find({
      stock: { $gt: 0 },
      discountPercentage: { $gt: 0 }, // Sirf discounted products
    })
      .sort({ discountPercentage: -1, createdAt: -1 }) // Highest discount first
      .limit(6)
      .select("name image price originalPrice discountPercentage stock slug");

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching top deals:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch top deals.",
    });
  }
};
