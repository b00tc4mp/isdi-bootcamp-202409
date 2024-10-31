import { Component } from 'react'
import Login from './view/Login'
import Register from './view/Register'
import Home from './view/Home'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'login' }
    }

    render() {
        return <div>
            <h1 className="header">UNSOCIAL</h1>

            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onRegisterClick={() => this.setState({ view: 'register' })}
            />}
            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegistered={() => this.setState({ view: 'login' })}
            />}
            {this.state.view === 'home' && <Home
                logoutClick={() => this.setState({ view: 'login' })}
            />}
        </div>
    }
}
export default App
