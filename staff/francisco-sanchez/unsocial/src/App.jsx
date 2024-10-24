import { Component } from 'react'

import { Login, Register, Home, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'
//La classe App extiende de component y la declaramos como class porque será dinámica e ira mutando conforme utilicemos la app
export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { view: logic.isUserLoggedIn() ? 'home' : 'login' }
    }

    render() {
        return <>
            <Header view={this.state.view}
                onHomeClick={() => this.setState({ view: 'home' })}
                onLoggedOut={() => this.setState({ view: 'login' })} />

            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onNavRegister={() => this.setState({ view: 'register' })} />}

            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegisterClick={() => this.setState({ view: 'login' })} />}

            {this.state.view === 'home' && <Home />}

            {this.state.view === 'new-post' && <CreatePost
                onCreated={() => this.setState({ view: 'home' })} />}

            <Footer onNewPostClick={() => this.setState({ view: 'new-post' })} view={this.state.view} />
        </>
    }
}