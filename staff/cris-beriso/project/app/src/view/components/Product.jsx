export default function Product({ product }) {
  const {
    name,
    image,
    likes,
    liked,
    dislikes,
    disliked
  } = product
  return <article>
    <img src={image} />

    <h3>{name}</h3>

    <p>{`${liked ? '❤️' : '🤍'} ${likes} likes`}</p>

    <p>{`${disliked ? '💔' : '🤍'} ${dislikes} dislikes`}</p>

  </article>
}