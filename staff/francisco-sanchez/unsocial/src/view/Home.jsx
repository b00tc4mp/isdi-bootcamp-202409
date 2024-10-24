import { Component } from "react"
import { PostList } from "../components/functional"
import './Home.css'



//Function Home, que se encargará de mostrar la pantalla principal de la aplicación
export default class extends Component {
    constructor(props) {
        console.log("Constructor de home")
        super(props)

        //En el pase del estado le pasamos la pantalla a la que iremos y el nombre del usuario para saludarlo :) 
        this.state = { view: 'list' }
    }

    render() {
        console.log('Render del Home')

        return <main className="Home">
            <div className="container">
                {this.state.view === 'list' && <PostList />}
            </div>
        </main>

        // return <main className="Home">
        //     <div className="container">
        //         <h2>Home</h2>

        //         <div className="botones-home">
        //             <button type="button" className="Button" onClick={event => {
        //                 event.preventDefault()
        //                 console.log('Click en el boton logout')
        //                 //loggedInUser = null
        //                 delete sessionStorage.UserId
        //                 this.props.onLoggedOut()

        //             }}>Logout</button>

        //             <button type="button" className="Button" onClick={() => this.setState({ view: 'new' })}>✚ New Post</button>
        //         </div>
        //         {this.state.view === 'list' && <PostList />}
        //         {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}
        //     </div>
        // </main>
    }
}