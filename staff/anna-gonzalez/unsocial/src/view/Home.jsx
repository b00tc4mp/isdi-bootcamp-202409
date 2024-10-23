import { Component } from 'react'

import PostList from '../components/functional/PostList'
import CreatePost from '../components/functional/CreatePost'
import Button from '../components/library/Button'

import logic from '../logic'

import './Home.css'

class Home extends Component { //-----------Home-----------
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        let name //outside because if it is inside it will never be displayed

        try {
            name = logic.getUserName()
        } catch (error) {
            alert(error.message)//for the user

            console.error(error)//for the developer
        }
        this.state = { name: name, view: 'list' }
    }

    render() {
        return <main className="Home">
            <h3>Welcome, {this.state.name}!</h3>
            <Button type="button" onClick={() => {
                logic.logoutUser()

                this.props.onLoggedOut()
            }}>Logout</Button>
            <Button type="button" onClick={() => this.setState({ view: 'new' })}>+</Button>

            {this.state.view === 'list' && <PostList onDeleted={() => this.setState({ view: 'list' })} />}
            {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}
        </main>
    }
}

export default Home