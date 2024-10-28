import { Component } from 'react'

import './Comments.css'
import logic from '../../logic'

import { Comment, AddComment } from './index'

class Comments extends Component {
  constructor(props) {
    super(props)

    let comments
    try {
      comments = logic.getComments(props.postId)
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
    this.state = { comments }
  }

  onRemoved = () => {
    try {
      const comments = logic.getComments(this.props.postId)

      this.setState({ comments })

      this.props.onRemoved()
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  onAdded = () => {
    try {
      const comments = logic.getComments(this.props.postId)
      this.setState({ comments })
      this.props.onAdded()
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  render() {
    console.log('Render -> Comments')
    return (
      <section className="Comments">
        <ul>
          {this.state.comments.map(comment =>
            <Comment
              postId={this.props.postId}
              comment={comment}
              onRemoved={this.onRemoved} />)}
        </ul>

        <AddComment
          postId={this.props.postId}
          onAdded={this.onAdded} />

      </section>
    )
  }

}

export default Comments