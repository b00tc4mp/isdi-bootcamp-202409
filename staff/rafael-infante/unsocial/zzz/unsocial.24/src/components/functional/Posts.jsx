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

  render() {
    return (
      <div>
        {this.state.posts.map(post => <Post item={post}

          onLiked={() => {
            try {
              const posts = getPosts()
              this.setState({ posts })
            } catch (error) {
              alert(error.message)
              console.error(error)
            }
          }}
          onDeleted={() => {
            try {
              const posts = getPosts()
              this.setState({ posts })
            } catch (error) {
              alert(error.message)
              console.error(error)
            }
          }} />)}
      </div>
    )
  }
}


export default Posts