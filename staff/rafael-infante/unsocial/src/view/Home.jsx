import { Component } from "react"
import './Home.css'

import logic from "../logic"
import PostList from "../components/functional/PostList"
import CreatePost from "../components/functional/CreatePost"

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { view: 'list' }

  }

  render() {
    return (
      <main className="Home">

        {/* <button id="btn-post" type="button" onClick={() => this.setState({ view: 'new' })}>Post</button> */}

        {this.state.view === 'list' && <PostList />}
        {this.state.view === 'new' && <CreatePost onCreated={() => this.setState({ view: 'list' })} />}

      </main>
    )
  }
}

export default Home