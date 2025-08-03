import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); 

export const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Both username and password are required',
      });
    }

    if (
      username !== process.env.ADMIN_USERNAME ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: 'Wrong username or password',
      });
    }

    const token = jwt.sign(
      { username, role: 'admin' },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    // Cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    res.cookie('admin', token, cookieOptions);

    return res.status(200).json({
      success: true,
      message: `Welcome ${username}`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};


export const autoLogin = (req, res) => {
  try {
    const { username } = req.admin; 
    if (username === process.env.ADMIN_USERNAME) {
      return res.status(200).json({
        success: true,
        message: "Successfully Logged In",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Authentication failed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Server error: ${error.message}`,
    });
  }
};

//* logout the admin 

export const logout = async(req,res) => {
  try {
    const {username} = req.admin
    res.clearCookie("admin", {
      httpOnly: true,
    });
    res.status(200).json({
      success : true,
      message : "Sucessfully Logged Out"
    })
  } catch (error) {
    res.status(400).error({
      success : false,
      message : error.message
    })
  }
}