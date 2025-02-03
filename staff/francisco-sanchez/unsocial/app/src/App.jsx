import { useState } from 'react'

import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'

import { Login, Register, CreatePost, PostList, ViewProfile, ManageUsers } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import { Alert } from './components/library'
import { Confirm } from './components/library'



import { Context } from './view/useContext'

import logic from './logic'

//Añadimos router-dom para controlar las url
//import { useState } from 'react'

//import React, { Component } from 'react'

export default function App() {

    const [alert, setAlert] = useState({
        message: null,
        level: 'error'
    })

    const [confirm, setConfirm] = useState({
        message: null,
        level: 'error',
        callback: null
    })

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

    const handleManageUsers = () => navigate('/manage-users')

    const handleAlertAccepted = () => setAlert({
        message: null,
        level: 'error'
    })

    const handleConfirmAccepted = () => {
        confirm.callback(true)

        setConfirm({
            message: null,
            level: 'error',
            callback: null
        })
    }

    const handleConfirmCancelled = () => {
        confirm.callback(false)

        setConfirm({
            message: null,
            level: 'error',
            callback: null
        })
    }

    console.log('App -> render')

    return <Context.Provider value={{
        alert(message, level = 'error') { setAlert({ message, level }) },
        confirm(message, callback, level = 'error') { setConfirm({ message, callback, level }) }
    }}>
        {/* Componente Header recibe las funciones de cambio de vista como props */}
        {/* <Header view={view} onHomeClick={handleUserHomeClick} onLoggedOut={handleUserLoggedOut} onViewProfile={handleUserViewProfile} /> */}
        <Header onHomeClick={handleUserHomeClick} onLoggedOut={handleUserLoggedOut} onViewProfile={handleUserViewProfile} />

        <Routes>
            <Route path="/login" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Login onLoggedIn={handreUserLoggedIn} onRegisterClick={handleUserNavRegister} />} />

            <Route path="/register" element={logic.isUserLoggedIn() ? <Navigate to="/" /> : <Register onLoginClick={handleUserLoginClick} onRegistered={handleUserOnRegistered} />} />

            <Route path="/" element={logic.isUserLoggedIn() ? <PostList onManageUsers={handleManageUsers} /> : <Navigate to="/login" />} />

            <Route path="/new-post" element={logic.isUserLoggedIn() ? <CreatePost onCreated={handlePostCreated} /> : <Navigate to="/login" />} />

            <Route path="/user-profile" element={logic.isUserLoggedIn() ? <Navigate to="/user-profile" /> : <ViewProfile onHomeClick={handleUserHomeClick} />} />

            <Route path="/manage-users" element={(logic.isUserLoggedIn() && logic.isUserRoleModerator()) ? <ManageUsers /> : <Navigate to="/login" />} />

        </Routes>

        <Footer onNewPostClick={handleNewPostClick} />

        {alert.message && <Alert message={alert.message} level={alert.level} onAccepted={handleAlertAccepted} />}

        {confirm.message && <Confirm message={confirm.message} level={confirm.level} onAccepted={handleConfirmAccepted} onCancelled={handleConfirmCancelled} />}
    </Context.Provider>
}
