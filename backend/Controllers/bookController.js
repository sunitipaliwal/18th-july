import Book from '../models/Book.js';
import { BookModel } from "../Models/bookModel.js";
import User from '../models/User.js';

// ------------------------
// ➕ Add Book
// ------------------------
export const addBook = async (req, res) => {
  try {
    const { title, authorName, genre, description} = req.body;
    // const userId = req.body.userId;

    const newBook = new Book({
      title,
      authorName,
      genre,
      description,
      fileUrl,
      coverImageUrl,
      publishedBy: userId
    });

    await newBook.save();
    res.status(201).json({ success: true, msg: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Failed to add book', error: err.message });
  }
};

// ------------------------
// 🔍 Get Book Details
// ------------------------
export const getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate('publishedBy', 'username email');

    if (!book) return res.status(404).json({ success: false, msg: 'Book not found' });

    res.status(200).json({ success: true, book });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching book details', error: err.message });
  }
};

// ------------------------
// 📚 Get All Books
// ------------------------
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('publishedBy', 'username');
    res.status(200).json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching books', error: err.message });
  }
};

// ------------------------
// 👤 Get My Books (Published by Me)
// ------------------------
export const getMyBooks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const books = await Book.find({ publishedBy: userId });
    res.status(200).json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Error fetching user books', error: err.message });
  }
};

// ------------------------
// 🛒 Purchase Book
// ------------------------
export const purchaseBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ success: false, msg: 'User or Book not found' });
    }

    // Prevent double-purchase
    if (user.purchasedBooks.includes(bookId)) {
      return res.status(400).json({ success: false, msg: 'Book already purchased' });
    }

    user.purchasedBooks.push(bookId);
    await user.save();

    res.status(200).json({ success: true, msg: 'Book purchased successfully' });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Purchase failed', error: err.message });
  }
};
