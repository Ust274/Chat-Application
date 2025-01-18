import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true,     // prevent XSS attacks
    sameSite: "lax",    // changed from strict to allow cross-site requests
    secure: process.env.NODE_ENV === "production",  // only use HTTPS in production
    path: "/",          // cookie is available for all paths
  });

  return token;
};