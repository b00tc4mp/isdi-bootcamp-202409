import { Component } from "react"
import Header from "./components/functional/Header"
import Login from "./view/Login"
import Register from "./view/Register"
import Home from "./view/Home"
import Footer from "./components/functional/Footer"
import isUserLoggedIn from "./logic/isUserLoggedIn"
import logoutUser from "./logic/logoutUser"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = { view: isUserLoggedIn() ? 'home' : 'login' }
  }

  render() {
    console.log('App -> render')
    return (
      <>
        <Header />

        {this.state.view === 'login' && <Login
          onLoggedIn={() => this.setState({ view: 'home' })}
          onAnchorRegister={() => this.setState({ view: 'register' })}
        />}

        {this.state.view === 'register' && <Register
          onRegistered={() => this.setState({ view: 'login' })}
          onAnchorLogin={() => this.setState({ view: 'login' })}
        />}

        {this.state.view === 'home' && <Home
          onLoggedOut={() => {
            this.setState({ view: 'login' })
            logoutUser()
          }} />}

        <Footer />
      </>
    )
  }
}

export default App
