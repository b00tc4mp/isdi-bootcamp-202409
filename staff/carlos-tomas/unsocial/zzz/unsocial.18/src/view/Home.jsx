import './Home.css'

import { Component } from 'react'

import getUserName from '../logic/getUserName'
import PostList from '../components/functional/PostList'
import CreatePost from '../components/functional/CreatePost'
import Button from '../components/library/Button'
import Field from '../components/library/Field'

class Home extends Component {
    constructor(props) {
        console.log('Home -> constructor')

        super(props)

        let name

        try {
            name = getUserName(sessionStorage.loggedInUserId)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = { name: name, view: 'list' }
    }

    render() {
        console.log('Home -> render')

        return <section className='Home'>
            <h2>Home</h2>

            <h3>Hello, {this.state.name}!</h3>
            <Field>
                <Button type="button" onClick={() => {
                    delete sessionStorage.loggedInUserId

                    this.props.onLoggedOut()
                }}>Logout</Button>
                <Button type="button" onClick={() => this.setState({ view: 'new' })}>➕</Button>
            </Field>
            {this.state.view === 'list' && <PostList onDeleted={() => this.setState({ view: "list" })} />}
            {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}
        </section>
    }
}

export default Home