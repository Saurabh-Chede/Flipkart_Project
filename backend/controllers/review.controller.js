import ReviewModel from "../models/review.model.js";
import ProductModel from "../models/product.model.js";
import OrderModel from "../models/order.model.js";

const updateProductRating = async (productId) => {
  const reviews = await ReviewModel.find({ product: productId });

  const numReviews = reviews.length;

  const ratings =
    numReviews === 0
      ? 0
      : reviews.reduce((acc, item) => acc + item.rating, 0) / numReviews;

  await ProductModel.findByIdAndUpdate(productId, {
    ratings,
    numReviews,
  });
};

// CREATE REVIEW

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // check delivered order

    const order = await OrderModel.findOne({
      user: req.userId,
      orderStatus: "DELIVERED",
      "items.product": productId,
    });

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Purchase this product first",
      });
    }

    // already reviewed

    const exists = await ReviewModel.findOne({
      user: req.userId,
      product: productId,
    });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "Review already exists",
      });
    }

    await ReviewModel.create({
      user: req.userId,
      product: productId,
      rating,
      comment,
    });

    await updateProductRating(productId);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET REVIEWS

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({
      product: req.params.productId,
    })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE REVIEW

export const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();

    await updateProductRating(review.product);

    res.json({
      success: true,
      message: "Review updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE REVIEW

export const deleteReview = async (req, res) => {
  try {
    const review = await ReviewModel.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const productId = review.product;

    await review.deleteOne();

    await updateProductRating(productId);

    res.json({
      success: true,
      message: "Review deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const myReview = async (req, res) => {
  try {
    const reviews = await ReviewModel.find({
      user: req.userId,
    })
      .populate("product", "name image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
