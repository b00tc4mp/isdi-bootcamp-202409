import './PostItem.css'
import logic from '../../logic'
import getElapsedTime from '../../utils/getElapsedTime'

function PostItem({ item: { id, author, image, text, date, liked, likes }, onLiked, onDeleted }) {
  return (
    <article className='PostItem'>

      <h4>{author.username}</h4>

      <img src={image} className="img" />

      <a onClick={() => {
        logic.toggleLikePost(id)

        onLiked()
      }}>{liked ? '❤️' : '🤍'}{likes.length} likes</a>

      {author.id === logic.getUserId() && <a onClick={() => {
        if (confirm('Delete Post?')) {
          logic.deletePost(id)
          onDeleted()
        }
      }}>🗑️</a>}

      <p>{text}</p>

      <time>{getElapsedTime(date)} ago</time>

    </article>
  )
}

export default PostItem