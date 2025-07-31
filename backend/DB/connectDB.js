import mongoose from 'mongoose';

export const connectDB = async ()=>{
  try { 
    await mongoose.connect("mongodb+srv://paliwalsuniti99:uGB4xI9Oq5DJ5rGM@library-store.f4vh4rj.mongodb.net/library-store?retryWrites=true&w=majority&appName=library-store")
    console.log("database connected ")
    
  } catch (error) {
    console.log('error while connecting db', error);
    
  }

}