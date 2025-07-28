import express from 'express';
import {
  addBook,
  getBookDetails,
  getAllBooks,
  getMyBooks,
  purchaseBook
} from '../Controllers/bookController.js';

const bookRouter = express.Router();

// ➕ Add a book
bookRouter.post('/add', addBook);

// 📄 Get details of a single book
bookRouter.get('/details/:id', getBookDetails);

// 📚 Get all books
bookRouter.get('/all', getAllBooks);

// 👤 Get all books published by a specific user
bookRouter.get('/my-books/:userId', getMyBooks);

// 🛒 Purchase a book
bookRouter.post('/purchase', purchaseBook);

export default bookRouter;
