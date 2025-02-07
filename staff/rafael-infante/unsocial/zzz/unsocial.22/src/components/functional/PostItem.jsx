import './PostItem.css'
import logic from '../../logic'

function PostItem({ item: { id, author, image, text, date, liked, likes }, onLikeClicked }) {
  return (
    <article className='PostItem'>

      <h4>{author.username}</h4>

      <img src={image} className="img" />

      <a onClick={() => {
        logic.toggleLikePost(id)

        onLikeClicked()
      }}>{liked ? '❤️' : '🤍'}{likes.length} likes</a>



      <p>{text}</p>

      <time>{date}</time>

    </article>
  )
}

export default PostItem