import { Component } from 'react'

import PostList from '../components/functional/PostList'
import CreatePost from '../components/functional/CreatePost'

import getUserName from '../logic/getUserName'
import logoutUser from '../logic/logoutUser'

import './Home.css'

class Home extends Component {
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        let name 

        try{
            name= getUserName()
        }catch(error) {
            alert(error.message)

            console.error(error)
        }

        this.state = {name:name, view: 'list'}
    }

    render(){
        console.log('Home -> render')

        return <main className='Home'>
            <h3>Hello, {this.state.name}</h3>
            <button type="button" onClick={() =>{
                logoutUser()

                this.props.onLoggedOut()
            }}>Logout</button>

            <button type="button" onClick={() => this.setState({view: 'new' })}>➕</button>

            {this.state.view === 'list' && <PostList />}
            {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}

        </main>
    }
}

export default Home