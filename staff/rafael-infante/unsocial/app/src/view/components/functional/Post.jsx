import { useState } from 'react'
import { Comments } from './index'
import logic from '../../../logic'
import { getElapsedTime } from '../../../utils/index.js'
import './Post.css'
import Button from '../library/Button.jsx'

export default function Post({ post, onLiked, onDeleted, onCommentRemoved, onCommentAdded }) {
  const [view, setView] = useState(null)

  const { id, author, image, text, date, liked, likes, comments } = post

  const handleDeleteClick = () => {
    if (confirm('Delete Post?')) {
      try {
        logic.deletePost(id, error => {
          if (error) {
            alert(error.message)
            console.error(error)
            return
          }

          onDeleted()
        })
      } catch (error) {
        alert(error.message)
        console.error(error)
      }
    }
  }

  const handleLikeClick = () => {
    try {
      logic.toggleLikePost(id, error => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }

        onLiked()
      })

    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  const handleViewComments = () => setView(view ? null : 'comments')

  console.log('Render -> Post')

  return (
    <article className='Post'>

      <h4>{author.username}</h4>

      <img src={image} className="img" />

      <a onClick={handleLikeClick}>{liked ? '❤️' : '🤍'}{likes} likes</a>

      {author.id === logic.getUserId() && <a onClick={handleDeleteClick}>🗑️</a>}

      <a onClick={handleViewComments}> 💬{comments} comments</a>

      <p>{text}</p>
      <time>{getElapsedTime(date)} ago</time>

      {view === 'comments' && <Comments
        postId={id}
        onRemoved={onCommentRemoved}
        onAdded={onCommentAdded} />}

    </article>
  )
}