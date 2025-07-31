import express from 'express';
import {
  addBook,
  getBookDetails,
  getAllBooks,
  getMyBooks,
  purchaseBook
} from '../Controllers/bookController.js';


import { protect } from '../Middleware/protect.js';
import { uploadBookFiles } from '../Middleware/uploadMiddleware.js';

const bookRouter = express.Router();




bookRouter.post('/add-book', protect , uploadBookFiles,   addBook);


























bookRouter.get('/details/:id', getBookDetails);

bookRouter.get('/all', getAllBooks);

bookRouter.get('/my-books/:userId', getMyBooks);

bookRouter.post('/purchase', purchaseBook);

export default bookRouter;