import { useState } from 'react'

import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import useContext from '../useContext'

export default function Product({ product, onCommentAdded, onCommentRemoved }) {
  const [view, setView] = useState(null)

  const { alert, confirm } = useContext()

  const {
    id,
    nameProduct,
    image,
    description,
    likes,
    dislikes,
    // storePrices,
    comments
  } = product

  // const handleLikeClick = () => {
  //   try {
  //     //TODO logic.toggleLikeProduct
  //   } catch (error) {

  //   }
  // }

  // const handleDislikeClick = () => {
  //   try {
  //     //TODO logic.toggleDislikeProduct
  //   } catch (error) {

  //   }
  // }

  const handleCommentsClick = () => setView(view ? null : 'comments')

  return <article>
    <h4>{nameProduct}</h4>

    <img src={image} />

    <p>{description}</p>

    <Button > ❤️{likes} likes</Button>

    <Button >💔{dislikes} dislikes</Button>

    {/* <p>{storePrices}</p> */}

    <Button onClick={handleCommentsClick}>💬 {comments.length} comments</Button>

    {view === 'comments' && <Comments
      productId={id}
      onAdded={onCommentAdded}
      onRemoved={onCommentRemoved}
    />}
  </article>
}