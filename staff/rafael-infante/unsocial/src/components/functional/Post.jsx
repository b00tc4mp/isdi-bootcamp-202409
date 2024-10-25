import './Post.css'
import Comments from './Comments'
import logic from '../../logic'
import getElapsedTime from '../../utils/getElapsedTime'
import { Component } from 'react'

class Post extends Component {
  constructor(props) {
    super(props)

    this.state = { view: null }
  }

  render() {
    console.log('Render -> Post')

    const { item: { id, author, image, text, date, liked, likes }, onLiked, onDeleted } = this.props

    return (
      <article className='Post'>

        <h4>{author.username}</h4>

        <img src={image} className="img" />

        <a onClick={() => {
          logic.toggleLikePost(id)

          onLiked()
        }}>{liked ? '❤️' : '🤍'}{likes.length} likes</a>

        {author.id === logic.getUserId() && <a onClick={() => {
          if (confirm('Delete Post?')) {
            logic.deletePost(id)
            onDeleted()
          }
        }}>🗑️</a>}

        <a onClick={() => {
          this.setState({ view: this.state.view ? null : 'comments' })
        }}>📄</a>

        <p>{text}</p>
        <time>{getElapsedTime(date)} ago</time>
        {this.state.view === 'comments' && <Comments
          postId={id} />}

      </article>
    )
  }
}

export default Post