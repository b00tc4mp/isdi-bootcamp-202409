import {useState } from 'react'

import {Login, Register, Posts, CreatePost} from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default function App() {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'posts' : 'login');

  const handlePostCreated = () => setView({ view: 'posts' });

  const handleUserLoggedOut = () => setView({ view: 'login' });

  const handleUserLoggedIn = () => setView({ view: 'posts' });

  const handleRegisterClick = () => setView({ view: 'register' });

  const handleLoginClick = () => setView({ view: 'login' });

  const handleUserRegistered = () => setView({ view: 'login' });

  const handleNewPostClick = () => setView({ view: 'new-post' });

  const handleHomeClick = () => setView({ view: 'posts' });

  console.log('App -> render');
  
    return <>
      <Header view={view} onHomeClick={handleHomeClick} onLoggedOut ={handleUserLoggedOut} />

      {view === 'login' && <Login onLoggedIn={handleUserLoggedIn} onRegisterClick={handleRegisterClick}/>} 
     
      {view === 'register' && <Register onLoginClick={handleLoginClick} onRegistered={handleUserRegistered}/>}
      
      {view === 'posts' && <Posts />}   

      {view === 'new-post' && <CreatePost onCreated ={handlePostCreated}/>}

      <Footer onNewPostClick={handleNewPostClick} view={view}/>
    </>
};