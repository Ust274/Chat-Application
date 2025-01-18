import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import express from 'express'
import { generateToken } from "../utils/jwt.js"
import cloudinary from "../utils/cloud.js";
const app = express()

app.use(express.json())


export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validation checks
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    if (password.length < 5) {
      return res.status(400).json({ error: "Password should be at least 5 characters long" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User with this email already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Remove plain text password from request body

    // Create and save new user
    const newUser = new User({ fullName, email,password : hashedPassword});
    await newUser.save();
    // Generate JWT token
    generateToken(newUser._id, res);


    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation checks
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    generateToken(user._id, res);

    return res.json({ message: "User logged in successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
  
};

export const checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    
    if (!user) {
      return res.status(404).json({ 
        error: true, 
        message: "User not found" 
      });
    }

    return res.status(200).json({ 
      error: false,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Check user error:", error);
    return res.status(500).json({ 
      error: true, 
      message: "Internal server error" 
    });
  }
};

export const updateProfilePic = async(req, res) =>{
  try {
    const {profilePic} = req.body;
    const userId = req.user._id;

    if(!profilePic) {
      return res.status(401).json({ error: "Profile pic required" });
  }

  const uploadPic = await cloudinary.uploader.upload(profilePic);
  const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadPic.secure_url }, { new: true });

  res.status(200).json(updatedUser);

}
  catch (error) {
    console.error("Get profile pic error:", error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};