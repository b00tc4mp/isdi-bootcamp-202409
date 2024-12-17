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

  return <article className="bg-[var(--box-color)] w-[15rem] h-fit flex flex-col box-border rounded-lg shadow-lg p-2">
    <Link to={`/products/${id}`}>
      <img src={image} />

      <h3 className="m-1 self-center ">{name}</h3>
      <div className="flex flex-row justify-around">
        <p>{`${liked ? '❤️' : '🤍'} ${likes} likes`}</p>
        <p>{`${disliked ? '💔' : '🤍'} ${dislikes} dislikes`}</p>
      </div>
    </Link>

  </article>
}