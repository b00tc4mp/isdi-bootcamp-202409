import { Component } from 'react'

import { Login, Register, PostList, CreatePost } from './view'

import Header from './components/function/Header'
import Footer from './components/function/Footer'

import logic from './logic'

export default class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: logic.isUserLoggedIn() ? 'posts' : 'login' }
    }

    handlePostCreated = () => this.setState({ view: 'posts' })

    handleUserLoggedOut = () => this.setState({ view: 'login' })

    handleUserLoggedIn = () => this.setState({ view: 'posts' })

    handleRegisterClick = () => this.setState({ view: 'register' })

    handleLoginClick = () => this.setState({ view: 'login' })

    handleUserRegistered = () => this.setState({ view: 'login' })

    handleNewPostClick = () => this.setState({ view: 'new-post' })

    handleHomeClick = () => this.setState({ view: 'posts' })

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
            {this.state.view === 'posts' && <PostList />}

            {this.state.view === 'new-post' && <CreatePost onCreated={this.handlePostCreated} />}

            <Footer
                onNewPostClick={this.handleNewPostClick} view={this.state.view} />
        </div>
    }
}

