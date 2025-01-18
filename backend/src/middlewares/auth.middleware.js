import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res
      .status(401)
      .json({ 
        error: true, 
        message: "Authentication token is required" 
      });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId)
      .select("-password")
      .lean();
    
    if (!user) {
      return res
        .status(404)
        .json({ 
          error: true, 
          message: "User associated with token no longer exists" 
        });
    }

    req.user = user;
    next();

  } catch (error) {
    const errorMessage = error instanceof jwt.JsonWebTokenError 
      ? "Invalid authentication token"
      : "Authentication failed";

    return res
      .status(401)
      .json({
        error: true,
        message: errorMessage
      });
  }
};