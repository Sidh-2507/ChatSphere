import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utills.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  console.log("Received request body:", req.body);
  const { fullName, email, password } = req.body;
  try {
    //hash password
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password should be at least 6 characters long" });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePicture: newUser.profilePicture,
        message: "User created successfully",
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("signup error", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "invalid email or password" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(404).json({ message: "invalid email or password" });
    }

    generateToken(user._id, res);

    console.log("✅ Login Function Passed!");

    return res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (error) {
    console.log("Error in login", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = (req, res) => {
  try {
    console.log("➡️ Logout function called!");

    res.clearCookie("jwt", { httpOnly: true, sameSite: "Strict" }); // ✅ Properly clears the cookie

    console.log("✅ Cookie cleared!");
    return res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("❌ Error in logout:", error.message);

    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error" });
    }
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePicture } = req.body;

    const userId = req.user._id;

    if (!profilePicture) {
      return res.status(400).json({ message: "Profile picture is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePicture);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
    console.log("Updated User Sent Back:", updatedUser);
  } catch (error) {
    console.log("Error in updateProfile", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
    console.log("✅ Check Function Passed!");
  } catch (error) {
    console.log("Error in checkAuth", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
