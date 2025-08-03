import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';

export const checkAuthForStatus = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(200).json({
        isAuthenticated: false,
      });
    }
    
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(200).json({
        isAuthenticated: false,
      });
    }
    
    req.user = user;
    next();
    
  } catch (error) {
    return res.status(200).json({
      isAuthenticated: false,
    });
  }
};