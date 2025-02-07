import './Post.css'
import { Comments } from './index'
import logic from '../../logic'
import getElapsedTime from '../../utils/getElapsedTime'
import { Component } from 'react'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = { view: null }
  }

  handleDeleteClick = () => {
    if (confirm('Delete Post?')) {
      logic.deletePost(this.props.item.id)
      this.props.onDeleted()
    }
  }

  handleLikeClick = () => {
    try {
      logic.toggleLikePost(this.props.item.id)

      this.props.onLiked()
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

    const { item: { id, author, image, text, date, liked, likes, comments }, onCommentRemoved, onCommentAdded } = this.props

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

export default Post