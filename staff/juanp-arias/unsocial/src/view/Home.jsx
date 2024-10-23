import { Component } from "react"
import getUserName from '../logic/getUserName'
import PostList from '../components/function/PostList'
import CreatePost from '../components/function/CreatePost'

class Home extends Component {
    constructor(props) {
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

        return <section className="section-container">
            <h2>HOME</h2>

            <h3>Welcome, {this.state.name}! </h3>

            <button type="button"
                onClick={() => {
                    delete sessionStorage.loggedInUserId

                    this.props.logoutClick()

                }}>Logout</button>
            <button type="button" onClick={() => this.setState({ view: 'new' })}>+</button>

            {this.state.view === 'list' && <PostList />}
            {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}
        </section>
    }
}
export default Home