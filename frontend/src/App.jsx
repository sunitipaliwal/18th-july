import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Logout from './pages/Logout'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Search from './pages/Search'
import MyBook from './pages/MyBook'
import AddBook from './pages/AddBook'


const App = () => {
  return (
    <div> 
      <Navbar/>
      <Routes>
       <Route path='/login' element={<Login/>}/>
       <Route path='/signup' element={<Signup/>}/>
       <Route path='/search' element={<Search/>}/>
       <Route path='/my-book' element={<MyBook/>}/>
       <Route path='/add-book' element={<AddBook/>}/>
       <Route path='/logout' element={<Logout/>}/>
       
       <Route path='/' element={<Home/>}/>
       


       
   </Routes>
   <Footer/>

    </div>
   
  )
}

export default App