import { Component } from "react"
import logic from "../logic"
import { Post } from "../components/functional/index"
import './Posts.css'

class Posts extends Component {
  constructor(props) {
    super(props)

    let posts

    try {
      posts = logic.getPosts()
    } catch (error) {
      alert(error.message)
      console.error(error)
    }

    this.state = { posts }
  }

  handleLiked = () => {
    try {
      const posts = logic.getPosts()
      this.setState({ posts })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  handleDeleted = () => {
    try {
      const posts = logic.getPosts()
      this.setState({ posts })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  handleCommentRemoved = () => {
    try {
      const posts = logic.getPosts()
      this.setState({ posts })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  handleCommentAdded = () => {
    try {
      const posts = logic.getPosts()
      this.setState({ posts })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  render() {
    return (
      <main className="Posts">
        {this.state.posts.map(post => <Post
          key={post.id}
          item={post}
          onLiked={this.handleLiked}
          onDeleted={this.handleDeleted}
          onCommentRemoved={this.handleCommentRemoved}
          onCommentAdded={this.handleCommentAdded} />)}
      </main>
    )
  }
}


export default Posts