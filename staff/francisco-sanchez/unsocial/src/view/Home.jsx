import './Home.css'

import { Component } from "react"

import getUserName from "../logic/getUserName"
import PostList from "../components/functional/PostList"
import CreatePost from "../components/functional/CreatePost"

//Function Home, que se encargará de mostrar la pantalla principal de la aplicación
class Home extends Component {
    constructor(props) {
        console.log("Constructor de home")
        super(props)

        let name //Para el nombre del usuario

        try {
            //name = getUserName(loggedInUser.id)
            console.log("Sesion en la carga de la home: " + sessionStorage.loggedInUserId)
            name = getUserName(sessionStorage.loggedInUserId)

        } catch (error) {
            alert(error.message)
            console.error(error)
        }

        //En el pase del estado le pasamos la pantalla a la que iremos y el nombre del usuario para saludarlo :) 
        this.state = { name: name, view: 'list' }
    }

    render() {
        console.log('Render del Home')

        return <section className="Home">
            <div className="container">
                <h2>Home</h2>
                <h3>Hello, {this.state.name}!</h3>

                <div className="botones-home">
                    <button type="button" className="Button" onClick={event => {
                        event.preventDefault()
                        console.log('Click en el boton logout')
                        //loggedInUser = null
                        delete sessionStorage.loggedInUserId
                        this.props.onLoggedOut()

                    }}>Logout</button>

                    <button type="button" className="Button" onClick={() => this.setState({ view: 'new' })}>✚ New Post</button>
                </div>
                {this.state.view === 'list' && <PostList />}
                {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}
            </div>
        </section>
    }
}

export default Home