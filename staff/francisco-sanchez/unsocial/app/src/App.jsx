//Añadimos router-dom para controlar las url
//import { useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import React, { Component } from 'react'

import { Login, Register, CreatePost, PostList, ViewProfile } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'


//La classe App extiende de component y la declaramos como class porque será dinámica e ira mutando conforme utilicemos la app
//export default class extends Component {
export default function App() {
    const navigate = useNavigate()

    //const [view, setView] = useState(logic.isUserLoggedIn() ? 'posts' : 'login')

    const handleUserViewProfile = () => navigate('/user-profile') //setView('viewProfile')

    const handlePostCreated = () => navigate('/') //setView('posts')

    const handleUserLoggedOut = () => navigate('/')   //setView('login')

    const handleUserHomeClick = () => navigate('/') //setView('posts')

    const handreUserLoggedIn = () => navigate('/') //setView('posts')

    const handleUserNavRegister = () => navigate('/register') //setView('register')

    const handleUserLoginClick = () => navigate('/login') //setView('login')

    const handleUserOnRegistered = () => navigate('/login') //setView('login')

    const handleNewPostClick = () => navigate('/new-post') //setView('new-post')

    console.log('App -> render')


    return <>
        {/* Componente Header recibe las funciones de cambio de vista como props */}
        {/* <Header view={view} onHomeClick={handleUserHomeClick} onLoggedOut={handleUserLoggedOut} onViewProfile={handleUserViewProfile} /> */}
        <Header onHomeClick={handleUserHomeClick} onLoggedOut={handleUserLoggedOut} onViewProfile={handleUserViewProfile} />


        {/* {view === 'login' && <Login onLoggedIn={handreUserLoggedIn} onRegisterClick={handleUserNavRegister} />} */}

        {/* {view === 'register' && <Register onLoginClick={handleUserLoginClick} onRegistered={handleUserOnRegistered} />} */}

        {/* {view === 'posts' && <PostList />} */}

        {/* {view === 'new-post' && <CreatePost onCreated={handlePostCreated} />} */}

        {/* {view === 'viewProfile' && <ViewProfile onHomeClick={handleUserHomeClick} />} */}

        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handreUserLoggedIn} onRegisterClick={handleUserNavRegister} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleUserLoginClick} onRegistered={handleUserOnRegistered} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <PostList /> : <Navigate to="/login" />} />

            <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

            <Route path="/user-profile" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <ViewProfile onHomeClick={handleUserHomeClick} />} />
        </Routes>

        <Footer onNewPostClick={handleNewPostClick} />
    </>
}
