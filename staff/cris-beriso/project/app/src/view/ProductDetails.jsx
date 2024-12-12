import { useState, useEffect } from 'react'

import { Button } from './library'
import StorePrices from './components/StorePrices'
import Comments from './components/Comments'

import logic from '../logic'

import useContext from './useContext'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
  const { productId } = useParams()

  const [viewComments, setViewComments] = useState(null)
  const [product, setProduct] = useState(null)
  const [viewStorePrices, setViewStorePrices] = useState(null)

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

  if (!product) {
    return <p>Loading product details...</p>;
  }

  const handleLikeClick = () => {
    try {
      logic.toggleLikeProduct(productId)
        .then(() => logic.getProductDetails(productId)
          .then(setProduct))
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
        .then(() => logic.getProductDetails(productId)
          .then(setProduct))
        .catch(error => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleCommentsClick = () => setViewComments(viewComments ? null : 'comments')

  const handleCommentAdded = () => {
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
  }
  const handleCommentRemoved = () => {
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
  }

  const handleSaveClick = () => {
    try {
      logic.saveProduct(productId)
        .then(() => logic.getProductDetails(productId)
          .then(setProduct))
        .catch(error => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  const handleStoresClick = () => setViewStorePrices(viewStorePrices ? null : 'storePrices')

  const {
    id,
    name,
    image,
    description,
    likes,
    liked,
    dislikes,
    disliked,
    storePrices,
    comments,
    saved
  } = product

  return <article>
    <img src={image} />

    <h3>{name}</h3>

    <p>{description}</p>

    <Button onClick={handleLikeClick}> {`${liked ? '❤️' : '🤍'} ${likes} likes`}</Button>

    <Button onClick={handleDislikeClick}> {`${disliked ? '💔' : '🤍'} ${dislikes} dislikes`}</Button>

    <Button onClick={handleCommentsClick}>💬 {comments.length} comments</Button>

    <Button onClick={handleStoresClick}>Show prices and stores</Button>

    {/* CAMBIAR VISUALIZACIÓN BOTÓN SAVE*/}
    <Button onClick={handleSaveClick}>{`${saved ? 'Saved' : 'Save'}`}</Button>

    {viewComments === 'comments' && <Comments
      productId={id}
      onAdded={handleCommentAdded}
      onRemoved={handleCommentRemoved}
    />}

    {viewStorePrices === 'storePrices' && <StorePrices
      productId={id}
      storePrices={storePrices}
    />}
  </article>
}