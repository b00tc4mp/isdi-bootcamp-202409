import { Component } from 'react'

import { Login, Register, Home, CreatePost, ViewProfile } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'

//La classe App extiende de component y la declaramos como class porque será dinámica e ira mutando conforme utilicemos la app
//export default class extends Component {
export default class App extends Component {
    constructor(props) {
        super(props)

        //Validamos si el usuario está logueado para mostrar la home o login
        //this.state es una propiedad de this 
        this.state = { view: logic.isUserLoggedIn() ? 'home' : 'login' }
    }

    // Método para cambiar la vista a 'viewProfile' (perfil del usuario)
    onViewProfile = () => {
        this.setState({ view: 'viewProfile' })
    }

    render() {
        return <>
            {/* Componente Header recibe las funciones de cambio de vista como props */}
            <Header
                view={this.state.view}
                onHomeClick={() => this.setState({ view: 'home' })}
                onLoggedOut={() => this.setState({ view: 'login' })}
                onViewProfile={() => this.setState({ view: 'viewProfile' })} />

            {this.state.view === 'login' && <Login
                onLoggedIn={() => this.setState({ view: 'home' })}
                onNavRegister={() => this.setState({ view: 'register' })} />}

            {this.state.view === 'register' && <Register
                onLoginClick={() => this.setState({ view: 'login' })}
                onRegisterClick={() => this.setState({ view: 'login' })} />}

            {this.state.view === 'home' && <Home />}

            {this.state.view === 'new-post' && <CreatePost
                onCreated={() => this.setState({ view: 'home' })} />}

            {this.state.view === 'viewProfile' && <ViewProfile          //La primera linea hace referencia a la vista
                onHomeClick={() => this.setState({ view: 'home' })} />} {/* La segunda, a las acciones dentro de la misma */}

            <Footer onNewPostClick={() => this.setState({ view: 'new-post' })} view={this.state.view} />
        </>
    }
}