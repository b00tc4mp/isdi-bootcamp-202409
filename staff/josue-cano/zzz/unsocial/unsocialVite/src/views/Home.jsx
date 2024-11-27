import { Component } from 'react'

import getUsername from '../components/logic/getUserName';
import PostList from '../components/functional/PostList'
import CreatePost from '../components/functional/CreatePost'
import header from '../components/functional/Header';

class Home extends Component{
    constructor(props){
        super(props)
        // const usuarioId = localStorage.getItem("usuarioActual")
        const usuarioId = sessionStorage.getItem("usuarioActual");
        //adquiero el nombre para imprimirlo en home
        let nombre  = getUsername(usuarioId)
        // this.state={usuario:nombre}
        this.state = { usuario: nombre, view: 'list' }
       
    }
render(){
    return <section>
        <h2>Home</h2>

        <h3>Hello, {this.state.usuario}!</h3>

        <button type="button" onClick={() => {
                delete sessionStorage.loggedInUserId

                this.props.onLoggedOut()
            }}>Logout</button>

        <button type="button" onClick={() => this.setState({ view: 'new' })}>➕</button>

        {this.state.view === 'list' && <PostList />}
        {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}

    </section>
}
}
export default Home