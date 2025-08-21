import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { userRouter } from './Routes/userRouter.js';
import { connectDB } from './DB/connectDB.js';
import bookRouter from './Routes/bookRouter.js';

import path from 'path';
import { fileURLToPath } from 'url';


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); //
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.get('/', (req, res) => {
  res.send("this one is backend")
})


app.use("/api/user", userRouter)
app.use("/api/book", bookRouter)



connectDB();
app.listen(3000, () => {
  console.log(`server is running succesfully at:: http://localhost:3000`)
})