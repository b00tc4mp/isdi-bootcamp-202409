import { Component } from 'react'

import { Home, Login, Register, CreatePost } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: logic.isUserLoggedIn() ? 'home' : 'login' }
    }

    render() {
        return <>
            <Header view={this.state.view} onHomeClick={() => this.setState({ view: 'home' })} onLoggedOut={() => this.setState({ view: 'login' })} />

            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onRegisterLink={() => this.setState({ view: 'register' })} />}

            {this.state.view === 'register' && <Register
                onRegister={() => this.setState({ view: 'login' })}
                onLoginLink={() => this.setState({ view: 'login' })} />}

            {this.state.view === 'home' && <Home />}

            {this.state.view === 'new-post' && <CreatePost onCreatePost={() => this.setState({ view: 'home' })} />}

            <Footer onNewPostClick={() => this.setState({ view: 'new-post' })} view={this.state.view} />
        </>

    }
}

export default App