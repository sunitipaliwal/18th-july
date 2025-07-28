import express from 'express'
import cors from 'cors'
import { userRouter } from './Routes/userRouter.js';
import { connectDB } from './DB/connectDB.js';
import { bookRouter } from './Routes/bookRouter.js';


const app= express();

app.use(express.json()); //


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true
}));


app.get('/', (res,req)=>{
 res.send("this one is backend")
})


app.use("/api/user", userRouter)
app.use("/api/book", bookRouter)



connectDB();
app.listen(3000, ()=>{
  console.log(`server is running succesfully at:: http://localhost:3000`)
})