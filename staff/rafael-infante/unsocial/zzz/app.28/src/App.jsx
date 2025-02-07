import { Component } from "react"

import { Login, Register, Posts, CreatePost } from "./view"

import { Header, Footer } from './components/functional'

import logic from "./logic"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { view: logic.isUserLoggedIn() ? 'posts' : 'login' }
  }

  handleHomeClick = () => this.setState({ view: 'posts' })

  handleUserLoggedOut = () => {
    this.setState({ view: 'login' })
    logic.logoutUser()
  }

  handleUserloggedIn = () => this.setState({ view: 'posts' })

  handleAnchorRegister = () => this.setState({ view: 'register' })

  handleUserRegistered = () => this.setState({ view: 'login' })

  handleAnchorLogin = () => this.setState({ view: 'login' })

  handlePostCreated = () => this.setState({ view: 'posts' })

  handleNewPostClick = () => this.setState({ view: 'new-post' })

  render() {
    console.log('App -> render')
    return (
      <>
        <Header view={this.state.view}
          onHomeClick={this.handleHomeClick}
          onLoggedOut={this.handleUserLoggedOut} />

        {this.state.view === 'login' && <Login
          onLoggedIn={this.handleUserloggedIn}
          onAnchorRegister={this.handleAnchorRegister}
        />}

        {this.state.view === 'register' && <Register
          onRegistered={this.handleUserRegistered}
          onAnchorLogin={this.handleAnchorLogin}
        />}

        {this.state.view === 'posts' && <Posts />}

        {this.state.view === 'new-post' && <CreatePost
          onCreated={this.handlePostCreated} />}

        <Footer view={this.state.view}
          onHomeClick={this.handleHomeClick}
          onNewPostClick={this.handleNewPostClick} />
      </>
    )
  }
}

export default App
