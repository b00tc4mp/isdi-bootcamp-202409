import { useState, useEffect } from 'react'

import { Button } from './library'
import Comments from './components/Comments'

import logic from '../logic'

import useContext from './useContext'
import { useParams } from 'react-router-dom'

export default function ProductDetails({ onCommentAdded, onCommentRemoved }) {
  const { productId } = useParams()

  const [view, setView] = useState(null);
  const [product, setProduct] = useState(null)

  const { alert, confirm } = useContext()

  useEffect(() => {
    try {
      logic.getProductDetails(productId)
        .then(setProduct)
        .catch(error => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }, [productId])

  // if (!product) {
  //   return <p>Loading product details...</p>;
  // }

  const handleLikeClick = () => {
    try {
      logic.toggleLikeProduct(productId)
        .then(setProduct)
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
      logic.toggleDislikeProduct(productId)
        .then(setProduct)
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
      logic.saveProduct(productId)
        .then(setProduct)
        .catch(error => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }



  const {
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