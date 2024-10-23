import { Component } from "react"

import Header from "./components/functional/Header"
import Footer from "./components/functional/Footer"

import { Login, Register, Home, CreatePost } from "./view"

import logic from "./logic"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { view: logic.isUserLoggedIn() ? 'home' : 'login' }
  }

  render() {
    console.log('App -> render')
    return (
      <>
        <Header view={this.state.view} onHomeClick={() => {
          this.setState({ view: 'home' })
        }} onLoggedOut={() => {
          this.setState({ view: 'login' })
          logic.logoutUser()
        }} />

        {this.state.view === 'login' && <Login
          onLoggedIn={() => this.setState({ view: 'home' })}
          onAnchorRegister={() => this.setState({ view: 'register' })}
        />}

        {this.state.view === 'register' && <Register
          onRegistered={() => this.setState({ view: 'login' })}
          onAnchorLogin={() => this.setState({ view: 'login' })}
        />}

        {this.state.view === 'home' && <Home />}

        {this.state.view === 'new-post' && <CreatePost onCreated={() => this.setState({ view: 'home' })} />}

        <Footer onHomeClick={() => this.setState({ view: 'home' })} onNewPostClick={() => { this.setState({ view: 'new-post' }) }} />
      </>
    )
  }
}

export default App
