import { Component } from 'react'

import { Login, Register, Home, CreatePost } from './view'

import Header from './components/function/Header'
import Footer from './components/function/Footer'

import logic from './logic'

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = { view: logic.isUserLoggedIn() ? 'home' : 'login' }
    }

    handlePostCreated = () => this.setState({ view: 'home' })

    handleUserLoggedOut = () => this.setState({ view: 'login' })

    handleUserLoggedIn = () => this.setState({ view: 'home' })

    handleRegisterClick = () => this.setState({ view: 'register' })

    handleLoginClick = () => this.setState({ view: 'login' })

    handleUserRegistered = () => this.setState({ view: 'login' })

    handleNewPostClick = () => this.setState({ view: 'new-post' })

    handleHomeClick = () => this.setState({ view: 'home' })

    render() {
        return <div>

            <Header view={this.state.view}
                onHomeClick={this.handleHomeClick}
                onLoggedOut={this.handleUserLoggedOut} />

            {this.state.view === 'login' && <Login
                onLoggedIn={this.handleUserLoggedIn}
                onRegisterClick={this.handleRegisterClick}
            />}
            {this.state.view === 'register' && <Register
                onLoginClick={this.handleLoginClick}
                onRegistered={this.handleUserRegistered}
            />}
            {this.state.view === 'home' && <Home />}

            {this.state.view === 'new-post' && <CreatePost onCreated={this.handlePostCreated} />}

            <Footer
                onNewPostClick={this.handleNewPostClick} view={this.state.view} />
        </div>
    }
}

