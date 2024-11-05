import './Post.css'
import { Comments } from './index'
import logic from '../../logic'
import getElapsedTime from '../../utils/getElapsedTime'
import { Component } from 'react'

export default class extends Component {
  constructor(props) {
    console.log('Post -> constructor')

    super(props)

    this.state = { view: null }
  }

  handleDeleteClick = () => {
    if (confirm('Delete Post?')) {
      try {
        logic.deletePost(this.props.post.id, error => {
          if (error) {
            alert(error.message)
            console.error(error)
            return
          }
          this.props.onDeleted()

        })
      } catch (error) {
        alert(error.message)
        console.error(error)
      }
    }
  }

  handleLikeClick = () => {
    try {
      logic.toggleLikePost(this.props.post.id, error => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        this.props.onLiked()

      })

    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  handleViewComments = () => {
    this.setState({ view: this.state.view ? null : 'comments' })
  }

  render() {
    console.log('Render -> Post')

    const { post: { id, author, image, text, date, liked, likes, comments }, onCommentRemoved, onCommentAdded } = this.props

    return (
      <article className='Post'>

        <h4>{author.username}</h4>

        <img src={image} className="img" />

        <a onClick={this.handleLikeClick}>{liked ? '❤️' : '🤍'}{likes.length} likes</a>

        {author.id === logic.getUserId() && <a onClick={this.handleDeleteClick}>🗑️</a>}

        <a onClick={this.handleViewComments}> 💬{comments} comments</a>

        <p>{text}</p>
        <time>{getElapsedTime(date)} ago</time>

        {this.state.view === 'comments' && <Comments
          postId={id}
          onRemoved={onCommentRemoved}
          onAdded={onCommentAdded} />}

      </article>
    )
  }
}