import jwt from 'jsonwebtoken';
import  userModel  from '../Models/userModel.js';



export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.tokenCover;


   if (!token) return res.status(401).json({ success: false, msg: 'Not authorized, no token' });




    const decoded = jwt.verify(token, 'sp');

    const userId = decoded.userId;

    req.user = await userModel.findById(userId).select('-password');

    next();
  } catch (err) {
    res.status(401).json({ success: false, msg: 'Invalid token' });
  }
};