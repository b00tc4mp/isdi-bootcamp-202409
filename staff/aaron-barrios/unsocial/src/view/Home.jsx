import { Component } from "react"
import './Home.css'

import getUserName from '../logic/getUserName'
import PostList from '../Components/functional/PostList'
import CreatePost from '../components/functional/CreatePost'
import ProfileData from '../Components/functional/ProfileData'
import Button from '../Components/library/Button'

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

        return <section className="Home">

            <h2>Home</h2>

            {/* <a href="" className="prof"
                onClick={event => {
                    event.preventDefault()
                    this.props.profileAct()
                }}
            > Profile </a> */}

            <h3>Hello, {this.state.name}!</h3>

            <Button type="button"
                onClick={() => {

                    delete sessionStorage.loggedInUserId

                    this.props.logout()
                }}>Logout</Button>
            <p></p>

            {this.state.view === 'list' &&
                <PostList onDeleted={() => this.setState({ view: 'list' })} />}

            {this.state.view === 'new' &&
                <CreatePost onCreated={() => this.setState({ view: 'list' })} />}

            {this.state.view === 'profile' &&
                <ProfileData />}

            <Button type="button"
                onClick={() => this.setState({ view: 'new' })}>+</Button>

        </section >
    }

}

export default Home