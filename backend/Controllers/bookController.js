import { bookModel as Book } from "../Models/bookModel.js";
import userModel from "../Models/userModel.js";

/**
 * ➕ Add Book
 * - Requires protect middleware (req.user is set)
 * - Requires uploadBookFiles (multer.fields for 'coverImage' and 'file')
 */

export const addBook = async (req, res) => {
  
  try {
    const { title, authorName, genre, description, price, bookLength } = req.body;
    const user = req.user;

    // Use your original syntax
    const coverImageFile = req.files.coverImage?.[0];
    const bookFile = req.files['file']?.[0];

    if (!coverImageFile && !bookFile) {
      return res.status(400).json({ success: false, message: 'Both cover image and file are required (fields: coverImage, file)' });
    }
    if (!coverImageFile) {
  return res.status(400).json({ success: false, message: 'Missing file: coverImage' });
}
if (!bookFile) {
  return res.status(400).json({ success: false, message: 'Missing file: file' });
}
    const newBook = new bookModel({
      title,
      authorName,
      genre,
      description,
      fileUrl: bookFile.path,
      coverImageUrl: coverImageFile.path,
      publishedBy: user._id,
      price,
      bookLength
    });

    await newBook.save();

    // Link to user's publishedBooks (for Profile dashboard)
    await userModel.findByIdAndUpdate(user._id, {
      $push: { publishedBooks: newBook._id }
    });

    res.status(201).json({ success: true, msg: 'Book added successfully', book: newBook });
  } catch (err) {
    res.status(500).json({ success: false, msg: 'Failed to add book', error: err.message });
  }
};
/**
 * 🔍 Get Book Details
 */
export const getBookDetails = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId).populate("publishedBy", "username email");

    if (!book) return res.status(404).json({ success: false, msg: "Book not found" });

    res.status(200).json({ success: true, book });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching book details", error: err.message });
  }
};

/**
 * 📚 Get All Books (simple)
 * Note: You also have a more advanced GET /books route in your router.
 */
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("publishedBy", "username");
    res.status(200).json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching books", error: err.message });
  }
};

/**
 * 👤 Get My Books (Published by user)
 */
export const getMyBooks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const books = await Book.find({ publishedBy: userId });
    res.status(200).json({ success: true, books });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Error fetching user books", error: err.message });
  }
};

/**
 * 🛒 Purchase Book (basic version)
 * Note: Your schema uses booksBought on user and sells on book with ref 'Purchase',
 * this function is a simple placeholder to illustrate the flow.
 */
export const purchaseBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await userModel.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ success: false, msg: "User or Book not found" });
    }

    // If you track purchases, ensure you have a consistent structure.
    // This example assumes you store bookId in a user.booksBought array of ObjectIds.
    const alreadyBought = (user.booksBought || []).some((p) => String(p) === String(bookId));
    if (alreadyBought) {
      return res.status(400).json({ success: false, msg: "Book already purchased" });
    }

    // Push to user's booksBought (adjust if you use a Purchase model in practice)
    user.booksBought.push(bookId);
    await user.save();

    res.status(200).json({ success: true, msg: "Book purchased successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: "Purchase failed", error: err.message });
  }
};
