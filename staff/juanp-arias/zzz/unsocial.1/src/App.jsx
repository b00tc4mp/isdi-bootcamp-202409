import { Component } from 'react'

import { Login, Register, Home, CreatePost } from './view'

import Header from './components/function/Header'
import Footer from './components/function/Footer'

import logic from './logic'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: logic.isUserLoggedIn() ? 'home' : 'login' }
    }

    render() {
        return <div>

            <Header view={this.state.view} onHomeClick={() => this.setState({ view: 'home' })} onLoggedOut={() => this.setState({ view: 'login' })} />
            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onRegisterClick={() => this.setState({ view: 'register' })}
            />}
            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegistered={() => this.setState({ view: 'login' })}
            />}
            {this.state.view === 'home' && <Home />}

            {this.state.view === 'new-post' && <CreatePost onCreated={() => this.setState({ view: 'home' })} />}
            <Footer onNewPostClick={() => this.setState({ view: 'new-post' })} view={this.state.view} />
        </div>
    }
}
export default App
