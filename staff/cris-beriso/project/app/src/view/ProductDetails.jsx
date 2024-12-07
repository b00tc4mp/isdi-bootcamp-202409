import { useState } from 'react'

import { Button } from './library'
import Comments from './components/Comments'

import logic from '../logic'

import useContext from './useContext'

export default function ProductDetails({ product, onLiked, onDisliked, onSaved, onCommentAdded, onCommentRemoved }) {
  const [view, setView] = useState(null)

  const { alert, confirm } = useContext()

  const {
    id,
    name,
    image,
    description,
    likes,
    liked,
    dislikes,
    disliked,
    // storePrices,
    comments
  } = product

  const handleLikeClick = () => {
    try {
      logic.toggleLikeProduct(id)
        .then(onLiked)
        .catch(error => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleDislikeClick = () => {
    try {
      logic.toggleDislikeProduct(id)
        .then(onDisliked)
        .catch(error => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleCommentsClick = () => setView(view ? null : 'comments')

  const handleSaveClick = () => {
    try {
      logic.saveProduct(id)
        .then(onSaved)
        .catch(error => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  return <article>
    <img src={image} />

    <h3>{name}</h3>

    <p>{description}</p>

    <Button onClick={handleLikeClick}> {`${liked ? '❤️' : '🤍'} ${likes} likes`}</Button>

    <Button onClick={handleDislikeClick}> {`${disliked ? '💔' : '🤍'} ${dislikes} dislikes`}</Button>

    {/* <p>{storePrices}</p> */}

    <Button onClick={handleCommentsClick}>💬 {comments} comments</Button>
    {/* CAMBIAR VISUALIZACIÓN BOTÓN SAVE*/}
    <Button onClick={handleSaveClick}>Save</Button>


    {view === 'comments' && <Comments
      productId={id}
      onAdded={onCommentAdded}
      onRemoved={onCommentRemoved}
    />}
  </article>
}