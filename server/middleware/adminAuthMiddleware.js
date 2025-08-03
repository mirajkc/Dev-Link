import jwt from 'jsonwebtoken';

export const adminAuth = (req, res, next) => {
  try {
    const token = req.cookies.admin; // Get token from cookie
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No authentication token found",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};