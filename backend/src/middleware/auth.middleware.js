import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    console.log("➡️ protectRoute middleware hit!");

    const token = req.cookies.jwt;

    if (!token) {
      console.log("❌ No token found! Sending 401 response.");

      return res.status(401).json({ message: "Unauthorized - no token" }); // ✅ STOP execution
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      console.log("❌ Invalid token! Sending 401 response.");
      return res.status(401).json({ message: "Unauthorized - Invalid token" }); // ✅ STOP execution
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("❌ User not found! Sending 404 response.");
      return res.status(404).json({ message: "User not found" }); // ✅ STOP execution
    }

    req.user = user;
    console.log("✅ User authenticated:", user.email);
    console.log("Updating user ID:", user._id);

    next(); // ✅ Continue to next middleware **only if everything is valid**
  } catch (error) {
    console.error("❌ Error in protectRoute:", error.message);

    if (!res.headersSent) {
      return res.status(500).json({ message: "Server error" }); // ✅ Avoid multiple responses
    }
  }
};
