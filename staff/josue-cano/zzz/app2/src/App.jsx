import { Component } from 'react'

import { Login, Register, Post, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default class extends Component {
    constructor(props) {
        console.log('App -> constructor')

        super(props)

        this.state = { view: logic.isUserLoggedIn() ? 'post' : 'login' }
    }

    handlePostCreated = () => this.setState({ view: 'post' })

    handleUserLoggedOut = () => this.setState({ view: 'login' })

    handleUserLoggedIn = () => this.setState({ view: 'post' })

    handleRegisterClick = () => this.setState({ view: 'register' })

    handleLoginClick = () => this.setState({ view: 'login' })

    handleUserRegistered = () => this.setState({ view: 'login' })

    handleNewPostClick = () => this.setState({ view: 'new-post' })

    handleHomeClick = () => this.setState({ view: 'post' })

    render() {
        console.log('App -> render')

        return <>
            <Header view={this.state.view} onHomeClick={this.handleHomeClick} onLoggedOut={this.handleUserLoggedOut} />

            {this.state.view === 'login' && <Login onLoggedIn={this.handleUserLoggedIn} onRegisterClick={this.handleRegisterClick} />}

            {this.state.view === 'register' && <Register onLoginClick={this.handleLoginClick} onRegistered={this.handleUserRegistered} />}

            {this.state.view === 'post' && <Post />}

            {this.state.view === 'new-post' && <CreatePost onCreated={this.handlePostCreated} />}

            <Footer onNewPostClick={this.handleNewPostClick} view={this.state.view} />
        </>
    }
}