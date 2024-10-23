import { Component } from 'react'

import PostItem from './PostItem'

import getPosts from '../../logic/getPosts'

import './PostList'

class PostList extends Component {
  constructor(props) {
    console.log('PostList -> render')

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
    return <>
      <h3>Posts</h3>

      {this.state.posts.map(post => <PostItem item={post} onLikeClicked={() => {
        try {
          const posts = getPosts()

          this.setState({ posts })
        } catch (error) {
          alert(error.message)

          console.error(error)
        }
      }} />)}
    </>
  }
}

export default PostList

