import bcrypt from 'bcrypt';
import userModel from '../Models/userModel.js';
import jwt from 'jsonwebtoken'

// -----------------------
// 📥 Signup
// -----------------------
export const Signup = async (req, res) => {
  try {
    console.log('Signup body:', req.body); 
    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      username,
      email,
      password: hashedPass
    });

    await newUser.save();
    const userId = newUser._id

    const token = jwt.sign({ userId }, 'sp',
       { expiresIn: '7d'}
    );

    res.cookie('tokenCover', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(201).json({
      success: true,
      message: 'Signup successful',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
};


// -----------------------
// 🔐 Login
// -----------------------
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ success: false, msg: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, msg: 'Invalid credentials' });

    const userId = user._id

    const token = jwt.sign({ userId }, 'sp',
       { expiresIn: '7d'}
    );

    res.cookie('tokenCover', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
      success: true,
      msg: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// -----------------------
// 🚪 Logout
// -----------------------
export const Logout = async (req, res) => {
  try {
    // Clear cookie
    res.clearCookie("tokenCover");
    res.status(200).json({ success: true, msg: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging out' });
  }
};


// -----------------------
// 👤 Get Profile (UPDATED)
// -----------------------
export const getProfile = async (req, res) => {
  try {
    // ✅ Now using protect middleware: req.user is already there
    const user = await userModel.findById(req.user._id)
      .select('-password')
      .populate('publishedBooks')
      .populate('favorites');

    if (!user) return res.status(404).json({ success: false, msg: 'User not found' });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching profile' });
  }
};
