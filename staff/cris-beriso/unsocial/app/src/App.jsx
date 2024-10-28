import { Component } from 'react'

import { Login, Register, Home, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'
import ProfileUser from './view/ProfileUser'

export default class extends Component {
  constructor(props) {
    console.log('App -> constructor')

    super(props)

    this.state = { view: logic.isUserLoggedIn() ? 'home' : 'login' }
  }

  render() {
    console.log('App -> render')

    return <>
      <Header view={this.state.view} onHomeClick={() => this.setState({ view: 'home' })}
        onLoggedOut={() => this.setState({ view: 'login' })}
        onProfile={() => this.setState({ view: 'profile' })}
      />

      {this.state.view === 'login' && <Login
        onLoggedIn={() => this.setState({ view: 'home' })}
        onRegisterClick={() => this.setState({ view: 'register' })}
      />}
      {this.state.view === 'register' && <Register
        onRegisterIn={() => this.setState({ view: 'login' })}
        onLoginClick={() => this.setState({ view: 'login' })}
      />}
      {this.state.view === 'home' && <Home />}

      {this.state.view === 'new-post' && <CreatePost onCreated={() => this.setState({ view: 'home' })} />}

      {this.state.view === 'profile' && <ProfileUser onProfile={() => this.setState({ view: 'profile' })} />}

      <Footer onNewPostClick={() => this.setState({ view: 'new-post' })} view={this.state.view} />
    </>
  }
}
