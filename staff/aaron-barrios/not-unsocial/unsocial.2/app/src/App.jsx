import { Component } from "react"

import { Login, Register, Home, CreatePost } from './view'

import { Header, Footer } from './components/functional'

import ProfileData from './components/functional/ProfileData'

import logic from './logic'


export default class extends Component {
  constructor(props) {

    super(props)

    //PROPIEDAD ESTADO QUE NOS CHIVA LA QUE SE VE DE ENTRADA
    this.state = logic.isUserLoggedIn() ? { view: 'home' } : { view: 'login' }
  }

  //RENDER DE LAS DIFERENTES PÁGINAS
  render() {

    return <>
      <Header view={this.state.view}
        onHomeClick={() => this.setState({ view: 'home' })}
        onLoggedOut={() => this.setState({ view: 'login' })}
        onProfileClick={() => this.setState({ view: 'profile' })} />

      {
        this.state.view === 'login'
        && <Login
          onLoggedIn={() => this.setState({ view: 'home' })}
          onRegisterLink={() => this.setState({ view: 'register' })} />
      }
      {
        this.state.view === 'register'
        && <Register
          registered={() => this.setState({ view: 'login' })} />
      }
      {this.state.view === 'home'
        && <Home />}

      {this.state.view === 'new-post' && <CreatePost
        onCreated={() => this.setState({ view: 'home' })} />}

      {
        this.state.view === 'profile'
        && <ProfileData
          home={() => this.setState({ view: 'home' })}
          onProfile={() => this.setState({ view: 'profile' })} />
      }


      <Footer onNewPostClick={() => this.setState({ view: 'new-post' })} view={this.state.view} />
    </>
  }
}

