import { Component } from 'react'

import './Comments.css'
import logic from '../../logic'

import { Comment, AddComment } from './index'

class Comments extends Component {
  constructor(props) {
    super(props)

    this.state = { comments: [] }
  }

  componentDidMount() {
    try {
      logic.getComments(this.props.postId, (error, comments) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        this.setState({ comments })

      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  handleRemoved = () => {
    try {
      logic.getComments(this.props.postId, (error, comments) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        this.setState({ comments })
        this.props.onRemoved()

      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  handleAdded = () => {
    try {
      logic.getComments(this.props.postId, (error, comments) => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        this.setState({ comments })
        this.props.onAdded()

      })
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
              key={comment.id}
              postId={this.props.postId}
              comment={comment}
              onRemoved={this.handleRemoved} />)}
        </ul>

        <AddComment
          postId={this.props.postId}
          onAdded={this.handleAdded} />

      </section>
    )
  }

}

export default Comments