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

  return <article className="bg-[var(--box-color)] w-[15rem] h-fit flex flex-col box-border rounded-lg shadow-lg gap-5">
    <Link to={`/products/${id}`}>
      <img src={image} className="w-[80%] mx-auto" />

      <h3>{name}</h3>

      <p>{`${liked ? '❤️' : '🤍'} ${likes} likes`}</p>

      <p>{`${disliked ? '💔' : '🤍'} ${dislikes} dislikes`}</p>
    </Link>

  </article>
}