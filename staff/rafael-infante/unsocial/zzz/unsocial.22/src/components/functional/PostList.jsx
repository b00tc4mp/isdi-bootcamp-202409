import getPosts from "../../logic/getposts"

import PostItem from "./PostItem"
import { Component } from "react"

class PostList extends Component {
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
        {this.state.posts.map(post => <PostItem item={post} onLikeClicked={() => {

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


export default PostList