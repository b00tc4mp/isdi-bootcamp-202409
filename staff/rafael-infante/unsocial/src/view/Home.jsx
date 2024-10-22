import { Component } from "react"
import getUserName from "../logic/getUserName"
import boy from "../images/boy.png"
import PostList from "../components/functional/PostList"
import CreatePost from "../components/functional/CreatePost"

class Home extends Component {
  constructor(props) {
    super(props)

    let name

    try {
      name = getUserName(sessionStorage.loggedUserId)
    } catch (error) {
      alert(error.message)
      console.error(error)
    }

    this.state = { name: name, view: 'list' }

  }

  render() {
    return (
      <section id="home" className="section-container">
        <h2>Home</h2>
        <h3>Hello, {this.state.name}!</h3>
        <img src={boy} className="boy" />
        <button id="btn-logout" type="button" onClick={event => {
          event.preventDefault()
          this.props.onLoggedOut()
        }}>Logout</button>

        <button id="btn-post" type="button" onClick={() => this.setState({ view: 'new' })}>Post</button>

        {this.state.view === 'list' && <PostList />}
        {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}

      </section>
    )
  }
}

export default Home