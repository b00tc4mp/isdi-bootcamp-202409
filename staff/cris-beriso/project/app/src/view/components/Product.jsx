export default function Product({ product, onProductDetails }) {
  const {
    id,
    name,
    image,
    likes,
    liked,
    dislikes,
    disliked
  } = product

  const handleDetailsProduct = event => {
    event.preventDefault()

    onProductDetails(id)
  }

  return <article>
    <a href="" onClick={handleDetailsProduct}>
      <img src={image} />

      <h3>{name}</h3>

      <p>{`${liked ? '❤️' : '🤍'} ${likes} likes`}</p>

      <p>{`${disliked ? '💔' : '🤍'} ${dislikes} dislikes`}</p>
    </a>

  </article>
}