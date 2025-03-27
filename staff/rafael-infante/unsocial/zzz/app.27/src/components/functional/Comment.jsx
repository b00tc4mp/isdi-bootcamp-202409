import getElapsedTime from "../../utils/getElapsedTime"
import logic from "../../logic"

Comment = ({ postId, comment: { id, author, text, date }, onRemoved }) => {
  console.log('render -> Comment')

  const handleRemoved = () => {
    if (confirm('Delete comment?'))
      try {
        logic.removeComment(postId, id)

        onRemoved()
      } catch (error) {
        alert(error.message)
        console.error(error)
      }
  }

  return (
    <li>
      <h4>{author.username}</h4>
      <p>{text}</p>
      <time>{getElapsedTime(date)} ago</time>

      {author.id === logic.getUserId() && <a onClick={handleRemoved}>🗑️</a>}
    </li>
  )
}

export default Comment