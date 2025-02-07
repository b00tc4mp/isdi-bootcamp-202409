import { Component } from "react"
import './Home.css'

import getUserName from "../logic/getUserName"
import getUserUsername from "../logic/getUserUsername"
import PostList from "../components/functional/PostList"
import CreatePost from "../components/functional/CreatePost"

class Home extends Component {
  constructor(props) {
    super(props)

    let name
    let username

    try {
      name = getUserName()
      username = getUserUsername()
    } catch (error) {
      alert(error.message)
      console.error(error)
    }

    this.state = { name: name, username: username, view: 'list' }

  }

  render() {
    return (
      <main id="home" className="Home">
        <h3>Hello, {this.state.username}!</h3>
        <button id="btn-logout" type="button" onClick={event => {
          event.preventDefault()
          this.props.onLoggedOut()
        }}>Logout</button>

        {/* <button id="btn-post" type="button" onClick={() => this.setState({ view: 'new' })}>Post</button> */}

        {this.state.view === 'list' && <PostList />}
        {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}

      </main>
    )
  }
}

export default Home