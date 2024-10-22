import { Component } from 'react'
import Home from './view/Home'
import Login from './view/Login'
import Register from './view/Register'

class App extends Component {
    constructor(props) {
        super(props)

        !sessionStorage.loggedInUserId ? this.state = { view: 'login' } : this.state = { view: 'home' }
    }

    render() {
        return <div>
            <h1>Unsocial</h1>

            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onRegisterLink={() => this.setState({ view: 'register' })} />}

            {this.state.view === 'register' && <Register
                onRegister={() => this.setState({ view: 'login' })}
                onLoginLink={() => this.setState({ view: 'login' })} />}

            {this.state.view === 'home' && <Home
                onLogout={() => this.setState({ view: 'login' })} />}
        </div>
    }
}

export default App