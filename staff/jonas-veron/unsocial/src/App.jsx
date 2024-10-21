import { Component } from "react"

import Login from './view/Login'
import Register from './view/Register'
import Home from './view/Home'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            view: sessionStorage.loggedInUserId === undefined ? 'login' : 'home'
            }
        }
        

    render(){
        return <div>
            <h1>Welcome to Unsocial !</h1>

            {this.state.view === 'login' && <Login 
                onLoggedIn={() => this.setState({ view: 'home'})} 
                onRegisterLink={() => this.setState({ view: 'register' })}
            />}
            {this.state.view === 'register' && <Register
            loginBack={() => this.setState({ view: 'login'})}
            />}

            {this.state.view === 'home' && <Home onLoggedOut={() => this.setState({ view: 'login' })} />}

            
        </div>
    }
}

export default App
