import UserModel from "../models/user.model.js";
import CartModel from "../models/cart.model.js";
import mongoose from "mongoose";
import AddressModel from "../models/address.model.js"

export const updateUserProfile = async (req, res) => {};

export const deleteUserProfile = async (req, res) => {};

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId, quantity = 1 } = req.body;

    let cart = await CartModel.findOne({ user: userId });

    // if cart doesn't exist
    if (!cart) {
      cart = await CartModel.create({
        user: userId,
        items: [
          {
            product: productId,
            quantity,
          },
        ],
      });

      return res.status(201).json({
        success: true,
        cart,
      });
    }

    // safety check
    if (!cart.items) {
      cart.items = [];
    }

    // check existing product
    const existingProduct = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
      });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCartProducts = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await CartModel.findOne({ user: userId }).populate(
      "items.product"
    );

    if (!cart) {
      return res.status(200).json({
        success: true,
        items: [],
        message: "Cart is empty",
      });
    }

    res.status(200).json({
      success: true,
      items: cart.items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCartQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId, type, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid itemId" });
    }

    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    const item = cart.items[itemIndex];

    // ✅ Case 1: direct quantity set (optional support)
    if (quantity !== undefined) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        item.quantity = quantity;
      }
    }

    // ✅ Case 2: increment / decrement
    else if (type === "inc") {
      item.quantity += 1;
    } else if (type === "dec") {
      item.quantity -= 1;

      // remove if 0
      if (item.quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.status(400).json({
        message: "Invalid update type (use inc, dec or quantity)",
      });
    }

    await cart.save();

    return res.status(200).json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    console.error("Update Cart Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(itemId)) {
      return res.status(400).json({ message: "Invalid itemId" });
    }

    const cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // check item exists
    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // remove item
    cart.items.splice(itemIndex, 1);

    await cart.save();

    return res.status(200).json({
      message: "Item removed from cart",
      cart,
    });
  } catch (error) {
    console.error("Remove From Cart Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const applyCoupon = async (req, res) => {};

export const placeOrder = async (req, res) => {};

export const getUserOrders = async (req, res) => {};

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

    if (user.sellerRequestStatus === "pending") {
      return res.status(400).json({
        success: false,
        message: "Seller request already pending",
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

export const createAddress = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      fullName,
      phone,
      pincode,
      addressLine,
      city,
      state,
      landmark,
      addressType,
      isDefault,
    } = req.body;

    if (isDefault) {
      await AddressModel.updateMany(
        { user: userId },
        { isDefault: false }
      );
    }

    const address = await AddressModel.create({
      user: userId,
      fullName,
      phone,
      pincode,
      addressLine,
      city,
      state,
      landmark,
      addressType,
      isDefault,
    });

    res.status(201).json({
      success: true,
      address,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const userId = req.userId;

    const addresses = await AddressModel.find({
      user: userId,
    }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      addresses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const setDefaultAddress = async (
  req,
  res
) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    await AddressModel.updateMany(
      { user: userId },
      { isDefault: false }
    );

    await AddressModel.findByIdAndUpdate(id, {
      isDefault: true,
    });

    res.status(200).json({
      success: true,
      message: "Default address updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const {
      fullName,
      phone,
      pincode,
      addressLine,
      city,
      state,
      landmark,
      addressType,
      isDefault,
    } = req.body;

    const address = await AddressModel.findOne({
      _id: id,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    if (isDefault) {
      await AddressModel.updateMany(
        { user: userId },
        { isDefault: false }
      );
    }

    const updatedAddress =
      await AddressModel.findByIdAndUpdate(
        id,
        {
          fullName,
          phone,
          pincode,
          addressLine,
          city,
          state,
          landmark,
          addressType,
          isDefault,
        },
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      address: updatedAddress,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const address = await AddressModel.findOne({
      _id: id,
      user: userId,
    });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    const wasDefault = address.isDefault;

    await AddressModel.findByIdAndDelete(id);

    // If deleted address was default,
    // make another address default automatically
    if (wasDefault) {
      const anotherAddress =
        await AddressModel.findOne({
          user: userId,
        }).sort({ createdAt: -1 });

      if (anotherAddress) {
        anotherAddress.isDefault = true;
        await anotherAddress.save();
      }
    }

    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

