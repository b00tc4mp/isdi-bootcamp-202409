import { Component } from 'react'

import { Login, Register, Posts, CreatePost } from './view/index'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'
import ProfileUser from './view/ProfileUser'

export default class extends Component {
  constructor(props) {
    console.log('App -> constructor')

    super(props)

    this.state = { view: logic.isUserLoggedIn() ? 'posts' : 'login' }
  }

  handlePostCreated = () => this.setState({ view: 'posts' })

  handleUserLoggedOut = () => this.setState({ view: 'login' })

  handleUserLoggedIn = () => this.setState({ view: 'posts' })

  handleRegisterClick = () => this.setState({ view: 'register' })

  handleLoginClick = () => this.setState({ view: 'login' })

  handleUserRegirtered = () => this.setState({ view: 'login' })

  handleNewPostClick = () => this.setState({ view: 'new-post' })

  handlePostsClick = () => this.setState({ view: 'posts' })

  handleProfileClick = () => this.setState({ view: 'profile' })

  render() {
    console.log('App -> render')

    return <>
      <Header view={this.state.view} onHomeClick={this.handlePostsClick} onLoggedOut={this.handleUserLoggedOut} onProfile={this.handleProfileClick} />

      {this.state.view === 'login' && <Login onLoggedIn={this.handleUserLoggedIn} onRegisterClick={this.handleRegisterClick} />}

      {this.state.view === 'register' && <Register onRegisterIn={this.handleUserRegirtered} onLoginClick={this.handleLoginClick} />}

      {this.state.view === 'posts' && <Posts />}

      {this.state.view === 'new-post' && <CreatePost onCreated={this.handlePostCreated} />}

      {this.state.view === 'profile' && <ProfileUser onProfile={this.handleProfileClick} />}

      <Footer onNewPostClick={this.handleNewPostClick} view={this.state.view} />
    </>
  }
}
