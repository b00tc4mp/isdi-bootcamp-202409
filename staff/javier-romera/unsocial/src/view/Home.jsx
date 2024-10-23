import './Home.css'

import { Component } from 'react'

import logic from '../logic'

import PostList from '../components/functional/PostList'
import CreatePost from '../components/functional/CreatePost'
import Button from '../components/library/Button'

class Home extends Component {
    constructor(props) {
        super(props)

        let name

        try {
            name = logic.getUserName(sessionStorage.loggedInUserId)
        } catch (error) {
            alert(error.message)
            console.error(error)
        }

        this.state = { name: name, view: 'list' }
    }
    render() {
        return <main className="Home">
            <h3>Welcome, {this.state.name}!</h3>

            <Button type="button" classname="logout-button" onClick={() => {
                logic.logoutUser()

                this.props.onLoggedOut()
            }}>Logout</Button>
            <Button classname="create-button" type="button"
                onClick={() => this.setState({ view: 'new' })}>+</Button>

            {this.state.view === 'list' && <PostList onDeletedPost={() => this.setState({ view: 'list' })} />}
            {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}
        </main>
    }
}

export default Home