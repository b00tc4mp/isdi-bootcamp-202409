import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import Products from './views/Products'
import About from './views/About'
import Contact from './views/Contact'
import ProductItem from './views/ProductItem'
import Cart from './views/Cart'
import Login from './views/Login'
import PlaceOrder from './views/PlaceOrder'
import Orders from './views/Orders'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Register from './views/Register'
import Admin from './views/Admin'


const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px[9vw]'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/productItem/:productId' element={<ProductItem />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App