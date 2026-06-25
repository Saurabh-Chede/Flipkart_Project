import WishlistModel from "../models/wishlist.model.js";
import ProductModel from "../models/product.model.js";

export const getWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistModel.findOne({
      user: req.userId,
    }).populate("products");

    return res.status(200).json({
      success: true,
      wishlist: wishlist || {
        user: req.userId,
        products: [],
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await ProductModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let wishlist = await WishlistModel.findOne({
      user: req.userId,
    });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: req.userId,
        products: [productId],
      });

      return res.status(201).json({
        success: true,
        message: "Added to wishlist",
        wishlist,
      });
    }

    const alreadyExists = wishlist.products.some(
      (id) => id.toString() === productId
    );

    if (alreadyExists) {
      return res.status(400).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    wishlist.products.push(productId);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Added to wishlist",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await WishlistModel.findOne({
      user: req.userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId
    );

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Removed from wishlist",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearWishlist = async (req, res) => {
  try {
    const wishlist = await WishlistModel.findOne({
      user: req.userId,
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found",
      });
    }

    wishlist.products = [];

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Wishlist cleared",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    let wishlist = await WishlistModel.findOne({
      user: req.userId,
    });

    if (!wishlist) {
      wishlist = await WishlistModel.create({
        user: req.userId,
        products: [productId],
      });

      return res.status(200).json({
        success: true,
        action: "added",
      });
    }

    const exists = wishlist.products.some(
      (id) => id.toString() === productId
    );

    if (exists) {
      wishlist.products = wishlist.products.filter(
        (id) => id.toString() !== productId
      );

      await wishlist.save();

      return res.status(200).json({
        success: true,
        action: "removed",
      });
    }

    wishlist.products.push(productId);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      action: "added",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};