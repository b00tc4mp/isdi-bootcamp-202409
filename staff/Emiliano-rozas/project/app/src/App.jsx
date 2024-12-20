import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, Products, About, Contact, ProductDetail, Cart, Login, PlaceOrder, Orders, Register, Admin, UserProfile } from './views/index'

import { NavBar, Footer } from './components/index'

const App = () => {
  return (
    <div className="min-h-screen animated-gradient">
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px[9vw]'>
        <NavBar />
        <hr className='w-full border-1 bg-green-700 border-green-700' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/product/:productId' element={<ProductDetail />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/userProfile' element={<UserProfile />} />
          <Route path='/register' element={<Register />} />
          <Route path='/place-order' element={<PlaceOrder />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}

export default App