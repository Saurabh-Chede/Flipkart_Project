import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required", success: false });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found, Please register or check email.",
        success: false,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Is Password Valid:", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password, Please try again.",
        success: false,
      });
    }

    // token creation - jwt- jsonwebtoken
    // store token into cookie
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
    );
    console.log(token, "token");
    // res.cookie("token", token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
       path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      message: "User logged in successfully",
      user: userData,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging in user",
      error: error.message,
      success: false,
    });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",    
    });
    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error logging out user", error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("Token from cookies:", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Data:", decodedData);
    const user = await UserModel.findById(decodedData.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    return res.status(200).json({
      success: true,
      message: "Current user retrieved successfully",
      user: userData,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Error getting current user", error: error.message });
  }
};
