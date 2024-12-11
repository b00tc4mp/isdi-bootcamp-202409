import { Link } from "react-router-dom"

export default function Product({ product }) {
  const {
    id,
    name,
    image,
    likes,
    liked,
    dislikes,
    disliked
  } = product

  return <article>
    <Link to={`/products/${id}`}>
      <img src={image} />

      <h3>{name}</h3>

      <p>{`${liked ? '❤️' : '🤍'} ${likes} likes`}</p>

      <p>{`${disliked ? '💔' : '🤍'} ${dislikes} dislikes`}</p>
    </Link>

  </article>
}