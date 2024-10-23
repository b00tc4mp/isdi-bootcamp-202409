import { Component } from "react"
import './Home.css'

import PostList from "../components/functional/PostList"
import CreatePost from "./CreatePost"

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { view: 'list' }

  }

  render() {
    return (
      <main className="Home">

        {this.state.view === 'list' && <PostList />}

      </main>
    )
  }
}

export default Home