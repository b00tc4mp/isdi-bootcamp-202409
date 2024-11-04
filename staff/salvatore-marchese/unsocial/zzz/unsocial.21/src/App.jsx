import { Component } from 'react'

import Login from './view/Login'
import Register from './view/Register'
import Home from './view/Home'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'



class App extends Component {
    constructor(props) {
        console.log('App -> constructor')

        super(props)

        this.state = { view: 'login' }
    }

    render() {
        console.log('App -> render')

        return <>
            <Header />

            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onRegisterClick={() => this.setState({ view: 'register' })}
            />}
            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegistered={() => this.setState({ view: 'login' })}
            />}
            {this.state.view === 'home' && <Home onLoggedOut={() => this.setState({ view: 'login' })} />}
        <Footer />
        </>
    }
}

export default App