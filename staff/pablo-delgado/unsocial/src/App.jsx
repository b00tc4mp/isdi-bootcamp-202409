import { Component } from 'react'

import { Login, Register, Home, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default class extends Component {
    constructor(props) {
        console.log('App -> constructor')

        super(props)

        this.state = { view: logic.isUserLoggedIn() ? 'home' : 'login' }
    }
    render() {
        console.log('App -> render')

        return <>
            <Header view={this.state.view} onHomeClick={() => this.setState({ view: 'home' })} onLoggedOut={() => this.state({ view: 'login' })} />

            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onRegisterClick={() => this.setState({ view: 'register' })}
            />}
            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegistered={() => this.setState({ view: 'login' })}
            />}
            {this.state.view === 'home' && <Home onLoggedOut={() => this.setState({ view: 'login' })} />}

            {this.state.view === 'new post' && <CreatePost onCreated={() => this.setState({ view: 'home' })} />}

            <Footer onNewPostClick={() => this.setState({ view: 'new-post' })} view={this.state.view} />
        </>
    }
}
