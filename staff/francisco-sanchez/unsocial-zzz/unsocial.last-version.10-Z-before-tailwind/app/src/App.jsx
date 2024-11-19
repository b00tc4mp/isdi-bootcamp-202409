import { useState } from 'react'

import React, { Component } from 'react'

import { Login, Register, CreatePost, PostList, ViewProfile } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'


//La classe App extiende de component y la declaramos como class porque será dinámica e ira mutando conforme utilicemos la app
//export default class extends Component {
export default function App() {

    const [view, setView] = useState(logic.isUserLoggedIn() ? 'posts' : 'login')

    const handleUserViewProfile = () => setView('viewProfile')

    const handlePostCreated = () => setView('posts')

    const handleUserLoggedOut = () => setView('login')

    const handleUserHomeClick = () => setView('posts')

    const handreUserLoggedIn = () => setView('posts')

    const handleUserNavRegister = () => setView('register')

    const handleUserLoginClick = () => setView('login')

    const handleUserOnRegistered = () => setView('login')

    const handleNewPostClick = () => setView('new-post')

    console.log('App -> render')


    return <>
        {/* Componente Header recibe las funciones de cambio de vista como props */}
        <Header view={view} onHomeClick={handleUserHomeClick} onLoggedOut={handleUserLoggedOut} onViewProfile={handleUserViewProfile} />

        {view === 'login' && <Login onLoggedIn={handreUserLoggedIn} onNavRegister={handleUserNavRegister} />}

        {view === 'register' && <Register onLoginClick={handleUserLoginClick} onRegistered={handleUserOnRegistered} />}

        {view === 'posts' && <PostList />}

        {view === 'new-post' && <CreatePost onCreated={handlePostCreated} />}

        {view === 'viewProfile' && <ViewProfile onHomeClick={handleUserHomeClick} />}

        <Footer onNewPostClick={handleNewPostClick} view={view} />
    </>
}
