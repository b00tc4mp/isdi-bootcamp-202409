import { useState, useEffect } from 'react'

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

  const { alert } = useContext()

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

  return <main className="pt-16 pb-16 flex flex-col items-center justify-center">
    <article className="bg-[var(--box-color)] w-[15rem] h-fit flex flex-col box-border rounded-lg shadow-lg p-2">
      <img src={image} />

      <h3 className="font-bold">{name}</h3>

      <p>{description}</p>
      <div >
        <div className="grid grid-cols-3 grid-rows-1 gap-3 ">
          <button className="flex flex-row justify-center gap-1" onClick={handleLikeClick}> <img className="w-5" src={`${liked ? "/images/button-liked.png" : "/images/button-like.png"}`} />{likes}</button>

          <button className="flex flex-row justify-center gap-1" onClick={handleDislikeClick}> <img className="w-5" src={`${disliked ? "/images/button-disliked.png" : "/images/button-dislike.png"}`} />{dislikes}</button>

          <button className="flex flex-row justify-center" onClick={handleSaveClick}><img src={`${saved ? "/images/button-saved.png" : "/images/button-save.png"}`} /></button>
        </div>
        <div className="flex flex-col justify-center">
          <button className="col-span-3 flex flex-row justify-center gap-1" onClick={handleCommentsClick}><img src="/images/button-comments.png" /> {comments.length} comments</button>

          {viewComments === 'comments' && <Comments
            productId={id}
            onAdded={handleCommentAdded}
            onRemoved={handleCommentRemoved}
          />}
        </div>
        <div className="flex flex-col justify-center">
          <button className="col-span-3 flex flex-row justify-center" onClick={handleStoresClick}><img className="w-5" src="/images/button-storeprice.png" /></button>

          {viewStorePrices === 'storePrices' && <StorePrices
            productId={id}
            storePrices={storePrices}
          />}
        </div>
      </div>
    </article>

  </main>
}