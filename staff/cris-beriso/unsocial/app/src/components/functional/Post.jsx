import { useState } from 'react'

import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../util/getElapsedTime'

import './Post.css'

export default function Post({ post, onLiked, onDeleted, onCommentAdded, onCommentRemoved }) {
  const [view, setView] = useState(null)

  const {
    id,
    author,
    image,
    text,
    date,
    liked,
    likes,
    comments
  } = post

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

  const handleDeleteClick = () => {
    if (confirm('Delete post?')) {
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

  const handleCommentsClick = () => setView(view ? null : 'comments')

  const handleSaveClick = () => {
    try {
      logic.savePost(id)
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  console.log('Post-> render')

  return <article className="Post">
    <h4>{author.username}</h4>

    <img src={image} />

    <div className="postInfo">
      <p>{text}</p>

      <time>{getElapsedTime(date)} ago</time>
    </div>

    <div className="buttons">
      <Button onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes} likes`}</Button>

      {author.id === logic.getUserId() && <Button onClick={handleDeleteClick}>🗑</Button>}

      <Button onClick={handleCommentsClick}>💬 {comments} comments</Button>

      <Button onClick={handleSaveClick}>📂</Button>

      {logic.isUserRoleModerator() && <Button>💀</Button>}
    </div>

    {view === 'comments' && <Comments
      postId={id}
      onAdded={onCommentAdded}
      onRemoved={onCommentRemoved}
    />}
  </article>
}