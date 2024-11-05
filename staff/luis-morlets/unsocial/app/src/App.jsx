import { Component } from 'react'

import { PostList, Login, Register, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

export default class extends Component {
    constructor(props) {
        super(props)

        console.log('App -> constructor')
        this.state = { view: logic.isUserLoggedIn() ? 'posts' : 'login' }
    }

    handleHomeClick = () => this.setState({ view: 'posts' })
    handleUserLoggedOut = () => this.setState({ view: 'login' })
    handleUserLoggedIn = () => this.setState({ view: 'posts' })
    handleRegisterLink = () => this.setState({ view: 'register' })
    handleUserRegistered = () => this.setState({ view: 'login' })
    handleLoginLink = () => this.setState({ view: 'login' })
    handlePostCreated = () => this.setState({ view: 'posts' })
    handleNewPostClick = () => this.setState({ view: 'new-post' })

    render() {

        console.log('App -> render')
        return <>
            <Header view={this.state.view} onHomeClick={this.handleHomeClick} onLoggedOut={this.handleUserLoggedOut} />

            {this.state.view === 'login' && <Login
                onLoggedIn={this.handleUserLoggedIn}
                onRegisterLink={this.handleRegisterLink} />}

            {this.state.view === 'register' && <Register
                onRegister={this.handleUserRegistered}
                onLoginLink={this.handleLoginLink} />}

            {this.state.view === 'posts' && <PostList />}

            {this.state.view === 'new-post' && <CreatePost onCreatePost={this.handlePostCreated} />}

            <Footer onNewPostClick={this.handleNewPostClick} view={this.state.view} />
        </>

    }
}