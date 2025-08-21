import express from 'express';
import { Login, Logout, Signup, getProfile } from '../Controllers/userController.js';

// NEW: imports for favorites and protect
import { protect } from '../Middleware/protect.js';
import userModel from '../Models/userModel.js';
import { bookModel } from '../Models/bookModel.js';

export const userRouter = express.Router();

// Routes (your originals - unchanged)
userRouter.post('/signup', Signup);
userRouter.post('/login', Login);
userRouter.post('/logout', Logout);
userRouter.post('/profile', getProfile); // Expects userId in req.body (keep as-is)

// NEW: Add a secure GET /profile for logged-in user without userId in body
userRouter.get('/profile', protect, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id)
      .select('-password')
      .populate('publishedBooks')
      .populate('favorites');

    if (!user) return res.status(404).json({ success: false, msg: 'User not found' });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching profile' });
  }
});

// NEW: Favorites routes (minimal additions)
userRouter.post('/favorites/:bookId', protect, async (req, res) => {
  try {
    const { bookId } = req.params;
    await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { favorites: bookId } });
    await bookModel.findByIdAndUpdate(bookId, { $addToSet: { favorites: req.user._id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error adding favorite' });
  }
});

userRouter.delete('/favorites/:bookId', protect, async (req, res) => {
  try {
    const { bookId } = req.params;
    await userModel.findByIdAndUpdate(req.user._id, { $pull: { favorites: bookId } });
    await bookModel.findByIdAndUpdate(bookId, { $pull: { favorites: req.user._id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error removing favorite' });
  }
});

userRouter.get('/favorites', protect, async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).populate('favorites');
    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error loading favorites' });
  }
});
