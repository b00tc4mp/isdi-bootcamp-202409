import { Component } from 'react'

import Post from './Post'

import getPosts from '../../logic/getPosts'

import './Posts.css'

export default class extends Component {
  constructor(props) {
    console.log('Posts -> render')

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

  handleCommentAdded = () => {
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

  render() {
    console.log('Posts -> render')

    return <>
      {this.state.posts.map(post => <Post
        post={post}

        onLiked={this.handleLiked}

        onDeleted={this.handleDeleted}

        onCommentAdded={this.handleCommentAdded}

        onCommentRemoved={this.handleCommentRemoved}
      />)}
    </>
  }
}