import { Component } from "react"

import Login from './view/Login'
import Register from './view/Register'
import Home from './view/Home'

import ProfileData from './Components/functional/ProfileData'

import Header from './Components/functional/Header'
import Footer from './Components/functional/Footer'

class App extends Component {
  constructor(props) {
    super(props)

    //PROPIEDAD ESTADO QUE NOS CHIVA LA QUE SE VE DE ENTRADA
    this.state = sessionStorage.loggedInUserId ? { view: 'home' } : { view: 'login' }
  }

  //RENDER DE LAS DIFERENTES PÁGINAS
  render() {

    return <>
      <Header />

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
      {
        this.state.view === 'home'
        && <Home
          logout={() => this.setState({ view: 'login' })}
          profileAct={() => this.setState({ view: 'profile' })} />
      }

      {
        this.state.view === 'profile'
        && <ProfileData
          home={() => this.setState({ view: 'home' })} />
      }

      <Footer />
    </>
  }
}

export default App
