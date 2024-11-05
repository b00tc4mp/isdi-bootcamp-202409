import { Component } from 'react'

import { Login, Register, Posts, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default class extends Component {
  constructor(props) {

    console.log('App -> constructor')

    super(props)

    this.state = { view: logic.isUserLoggedIn() ? "posts" : "login" }
  }

  handleHomeclick = () => this.setState({ view: 'posts' })

  handleLoggedOut = () => this.setState({ view: 'login' })

  handleLoggedIn = () => this.setState({ view: "posts" })

  handleRegister = () => this.setState({ view: "register" })

  handleLogBack = () => this.setState({ view: "login" })

  handleUserRegistered = () => this.setState({ view: 'login' })

  handlePostCreated = () => this.setState({ view: 'posts' })

  handleOnCanceled = () => this.setState({ view: 'posts' })

  handleNewPostClick = () => this.setState({ view: 'new-post' })

  render() {

    console.log('App-> render')

    return <>

      <Header view={this.state.view} onHomeClick={this.handleHomeclick} logOut={this.handleLoggedOut} />

      {this.state.view === "login" && <Login
        onLoggedIn={this.handleLoggedIn}
        registerInquire={this.handleRegister}
      />}

      {this.state.view === "register" && <Register
        logBack={this.handleLogBack}
        onRegistered={this.handleUserRegistered}
      />}

      {this.state.view === "posts" && <Posts />}

      {this.state.view === 'new-post' && <CreatePost
        onCreated={this.handlePostCreated}
        onCancel={this.handleOnCanceled}
      />}

      <Footer onNewPostClick={this.handleNewPostClick} view={this.state.view} />
    </>
  }
}

