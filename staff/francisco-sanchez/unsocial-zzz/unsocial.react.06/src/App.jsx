import { Component } from 'react'

import Login from './view/Login'
import Register from './view/Register' //Puede fallar algo
import Home from './view/Home'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

//La classe App extiende de component y la declaramos como class porque será dinámica e ira mutando conforme utilicemos la app
class App extends Component {
    constructor(props) {
        super(props)

        this.state = { view: 'login' }
        // if (sessionStorage.loggedInUserId !== undefined) {
        //     this.state = { view: 'login' }
        // } else {

        //     this.state = { view: 'home' }
        //     console.log(sessionStorage.loggedInUserId)
        // }
    }

    render() {
        return <>
            <Header />

            {/* <h1>React v0.0.5</h1> */}
            {//Evaluación primera && evaluación segunda
                //Si la primera ya es falsa, ya no evalua la segunda
                this.state.view === 'login' && <Login
                    onLoggedIn={() => this.setState({ view: 'home' })}
                    onNavRegister={() => this.setState({ view: 'register' })} />}

            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegisterClick={() => this.setState({ view: 'login' })} />}

            {this.state.view === 'home' && <Home
                onLoggedOut={() => this.setState({ view: 'login' })} />}


            <Footer />
        </>
    }
}

export default App