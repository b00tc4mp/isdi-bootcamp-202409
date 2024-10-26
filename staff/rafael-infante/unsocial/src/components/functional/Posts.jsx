import getPosts from "../../logic/getPosts"

import Post from "./Post"
import { Component } from "react"

class Posts extends Component {
  constructor(props) {
    super(props)

    let posts

    try {
      posts = getPosts()
    } catch (error) {
      alert(error.message)
      console.error(error)
    }

    this.state = { posts }
  }

  handleLiked = () => {
    try {
      const posts = getPosts()
      this.setState({ posts })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  handleDeleted = () => {
    try {
      const posts = getPosts()
      this.setState({ posts })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  handleCommentRemoved = () => {
    try {
      const posts = getPosts()
      this.setState({ posts })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  handleCommentAdded = () => {
    try {
      const posts = getPosts()
      this.setState({ posts })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        {this.state.posts.map(post => <Post
          item={post}
          onLiked={this.handleLiked}
          onDeleted={this.handleDeleted}
          onCommentRemoved={this.handleCommentRemoved}
          onCommentAdded={this.handleCommentAdded} />)}
      </div>
    )
  }
}


export default Posts