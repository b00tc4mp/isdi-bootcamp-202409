import { Component } from 'react'

import { Login, Register, CreatePost, ViewProfile } from './view'

import Header from './components/functional/Header'
import Footer from './components/functional/Footer'

import logic from './logic'
import { PostList } from './components/functional'

/**
 * Validamos si existe localStorage, si no existe lo fuerzo
 */

const emptyArray = []

if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(emptyArray))

}

if (!localStorage.getItem('posts')) {
    localStorage.setItem('posts', JSON.stringify(emptyArray))
}



//La classe App extiende de component y la declaramos como class porque será dinámica e ira mutando conforme utilicemos la app
//export default class extends Component {
export default class App extends Component {
    constructor(props) {
        super(props)

        //Validamos si el usuario está logueado para mostrar la home o login
        //this.state es una propiedad de this 

        //Dentro del constructor aquí marcamos la vista que se cargará primero
        this.state = { view: logic.isUserLoggedIn() ? 'posts' : 'login' }
    }

    // Método para cambiar la vista a 'viewProfile' (perfil del usuario)
    // Este evento lo tenemos aquí porqué la vista se carga en la ventana principal
    onViewProfile = () => {
        this.setState({ view: 'viewProfile' })
    }

    handlePostCreated = () => this.setState({ view: 'posts' })

    handleUserLoggedOut = () => this.setState({ view: 'login' })

    handleUserHomeClick = () => this.setState({ view: 'posts' })

    handleUserViewProfile = () => this.setState({ view: 'viewProfile' })

    handreUserLoggedIn = () => this.setState({ view: 'posts' })

    handleUserNavRegister = () => this.setState({ view: 'register' })

    handleUserLoginClick = () => this.setState({ view: 'login' })

    handleUserOnRegistered = () => this.setState({ view: 'login' })



    render() {
        return <>
            {/* Componente Header recibe las funciones de cambio de vista como props */}
            <Header
                view={this.state.view}
                onHomeClick={this.handleUserHomeClick}
                onLoggedOut={this.handleUserLoggedOut}
                onViewProfile={this.handleUserViewProfile} />

            {this.state.view === 'login' && <Login onLoggedIn={this.handreUserLoggedIn} onNavRegister={this.handleUserNavRegister} />}

            {this.state.view === 'register' && <Register onLoginClick={this.handleUserLoginClick} onRegistered={this.handleUserOnRegistered} />}

            {this.state.view === 'posts' && <PostList />}

            {this.state.view === 'new-post' && <CreatePost onCreated={this.handlePostCreated} />}

            {this.state.view === 'viewProfile' && <ViewProfile onHomeClick={this.handleUserHomeClick} />}

            <Footer onNewPostClick={() => this.setState({ view: 'new-post' })} view={this.state.view} />
        </>
    }
}