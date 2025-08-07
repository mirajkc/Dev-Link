import User from "../model/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { streamUpload } from "../config/cloudinaryUpload.js";

// @route POST /api/user/signup
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists. Please log in.",
      });
    }

    // Upload image to Cloudinary
    let imageUrl;
    if (req.file) {
      const result = await streamUpload(req.file.buffer);
      imageUrl = result.secure_url;
    } else {
      return res.status(400).json({
        success: false,
        message: "Profile image is required",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email, 
      password: hashedPassword,
      profilePic: imageUrl,
    });

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // Set token cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error while registering user",
    });
  }
};


// @route POST /api/user/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Create JWT
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    // Set token cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return user data
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};

//api/user/get

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);  // <-- FIXED

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: user,  // <-- Return user object here
    });
  } catch (error) {
    console.error("Error in getUser:", error.message); // log the error
    return res.status(500).json({
      success: false,
      message: "Server error while fetching user",
    });
  }
};

// api/user/update 


export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, password, description, protfolio } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    if (req.file) {
      const result = await streamUpload(
        req.file.buffer,
        'profile_pics_penpixel',
        `${user._id}_profile`
      );
      user.profilePic = result.secure_url;
    }

    if (name) user.name = name;
    if (description) user.description = description;
    if (protfolio) user.protfolio = protfolio;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    console.error('Update Error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error while updating user',
    });
  }
};

//api/user/logout
export const logout = async (req, res) => {
  try {
    const userId = req.user.id;

    // Clear the token cookie
    res.clearCookie("token", {
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during logout",
    });
  }
};


//api/user/getUserByID
export const getUserByID = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id).select('-password'); 

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getUserByID:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

//* get all profile 
export const getAllProfile = async(req,res) => {
  try {
    const profiles = await User.find()
    res.status(200).json({
      success : true,
      profiles
    })
  } catch (error) {
    res.status(400).json({
        success : false,
        message : "Server error occured" + error.message,
      })
  }
}

//* delete the user by id 
export const deleteUserByID = async (req, res) => {
  try {
    const userId = req.body.id;
    const data = await User.findByIdAndDelete(userId);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: `User not found with id: ${userId}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Deleted the user ${data.name}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Server Error: ${error.message}`,
    });
  }
};



//* search for the user using the  userName
export const searchUser = async(req,res)=> {
  try {
    const {query} = req.query

    if(!query){
      return res.status(200).json({
        success : false,
        message : "Search field cant be empty"
      })
    }

    const regex = new RegExp('^' + query , 'i')
    const users = await User.find({name: {$regex: regex}})

    if(users){
      res.status(200).json({
        success : true,
        users
      })
    }

  } catch (error) {
    return res.status(200).json({
        success : false,
        message : `Server Error :  ${error.message}`
      })
  }
}

//* enhance portfolio with ai



import main from '../config/gemini.js';

export const enhanceWithAI = async (req, res) => {
  try {
    const { protfolio } = req.body;

    if (!protfolio) {
      return res.status(400).json({
        success: false,
        message: "Error! AI only enhances a provided portfolio — it won't generate one from scratch.",
      });
    }

    const content = await main(`${protfolio} . Please enhance the portfolio for this portfolio in simple text format.`);

    res.status(200).json({
      success: true,
      content,
    });

  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while generating content",
    });
  }
};
