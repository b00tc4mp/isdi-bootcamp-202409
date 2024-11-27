import { Component } from 'react'

import PostList from '../components/functional/PostList'
import CreatePost from '../components/functional/CreatePost'
import Button from '../components/library/Button'

import logic from '../logic'

import './Home.css'

class Home extends Component {
    constructor(props) {
        console.log("home => constructor")

        super(props)

        let name

        try {
            name = logic.getUserName()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }

        this.state = { name: name, view: "list" }
    }

    render() {
        console.log("home => render")

        return < section className='home'>
            <div className='botonesNav'>
                <Button type="button"
                    onClick={() => {

                        const confirmLogout = window.confirm("¿Are you sure you want to Logout?")

                        if (confirmLogout) {

                            logic.logoutUser

                            this.props.logOut()
                        }
                    }}
                >Logout</Button>

                <Button type="button"
                    onClick={() => this.setState({ view: "new" })}>➕</Button>
            </div>
            <div className='homeTitle'>
                <h2>Home</h2>

                <h3>Welcome back {this.state.name}!</h3>
            </div>
            {this.state.view === "list" && <PostList onDeleted={() => this.setState({ view: "list" })} />}
            {this.state.view === "new" && <CreatePost
                onCreated={() => this.setState({ view: "list" })}
                onCancel={() => this.setState({ view: "list" })} />}
        </section >
    }

}

export default Home