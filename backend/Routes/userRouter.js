import express from 'express';
import { Login, Logout, Signup, getProfile } from '../Controllers/userController.js';

export const userRouter = express.Router();

// Routes
userRouter.post('/signup', Signup);
userRouter.post('/login', Login);
userRouter.post('/logout', Logout);
userRouter.post('/profile', getProfile);  // Expects userId in req.body
