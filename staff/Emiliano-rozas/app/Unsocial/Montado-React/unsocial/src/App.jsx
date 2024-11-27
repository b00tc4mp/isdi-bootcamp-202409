import { Component } from 'react'

import Login from './view/Login'
import Register from './view/Register'
import Home from './view/Home'

import Footer from './components/functional/Footer'

import logic from './logic'

class App extends Component {
  constructor(props) {

    console.log('App -> constructor')

    super(props)

    this.state = { view: logic.isUserLoggedIn() ? "home" : "login" }
  }

  render() {

    console.log('App-> render')

    return <><div>
      <h1>Unsocial</h1>

      {this.state.view === "login" &&
        <Login
          onLoggedIn={() => this.setState({ view: "home" })}
          registerInquire={() => this.setState({ view: "register" })} />}

      {this.state.view === "register" &&
        <Register
          logBack={() => this.setState({ view: "login" })}
          onRegistered={() => this.setState({ view: 'login' })} />}

      {this.state.view === "home" &&
        <Home
          logOut={() => this.setState({ view: "login" })} />}

    </div> <Footer> Unsocial all rights reserved 2024™ </Footer></>
  }
}
export default App
