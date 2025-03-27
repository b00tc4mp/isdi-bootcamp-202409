import { getElapsedTime } from '../../../utils/index.js'
import logic from '../../../logic'
import useContext from '../../useContext.js'

export default ({ postId, comment: { id, author, text, date }, onRemoved }) => {
  console.log('render -> Comment')

  const { alert, confirm } = useContext()

  const handleRemoved = () => {
    confirm('Delete comment?', (accepted) => {
      if (accepted) {
        try {
          logic
            .removeComment(postId, id)
            .then(onRemoved)
            .catch((error) => {
              alert(error.message)

              console.error(error)
            })
        } catch (error) {
          alert(error.message)

          console.error(error)
        }
      }
    })
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
