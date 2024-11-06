import { Component, useState } from 'react'

import {Login, Register, Posts, CreatePost} from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default function App() {
  const [view, setView] = useState(logic.isUserLoggedIn() ? 'posts' : 'login');

  handlePostCreated = () => setView({ view: 'posts' });

  handleUserLoggedOut = () => setView({ view: 'login' });

  handleUserLoggedIn = () => setView({ view: 'posts' });

  handleRegisterClick = () => setView({ view: 'register' });

  handleLoginClick = () => setView({ view: 'login' });

  handleUserRegistered = () => setView({ view: 'login' });

  handleNewPostClick = () => setView({ view: 'new-post' });

  handleHomeClick = () => setView({ view: 'posts' });

  console.log('App -> render');

  render() {

    return <>
      <Header view={this.state.view} onHomeClick={this.handleHomeClick} onLoggedOut ={this.handleUserLoggedOut} />

      {this.state.view === 'login' && <Login onLoggedIn={this.handleUserLoggedIn} onRegisterClick={this.handleRegisterClick}/>} 
     
      {this.state.view === 'register' && <Register onLoginClick={this.handleLoginClick} onRegistered={this.handleUserRegistered}/>}
      
      {this.state.view === 'posts' && <Posts />}   

      {this.state.view === 'new-post' && <CreatePost onCreated ={this.handlePostCreated}/>}

      <Footer onNewPostClick={this.handleNewPostClick} view={this.state.view}/>
    </>
  }
};