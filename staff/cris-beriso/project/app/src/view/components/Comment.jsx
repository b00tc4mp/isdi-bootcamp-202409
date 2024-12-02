import { Button } from '../library'

import logic from '../../logic'

import { getElapsedTime } from '../../util'

export default function Comment({ productId, comment: { id, author, text, date }, onRemoved }) {

  const handleRemove = () => {
    if (confirm('Delete comment?'))
      try {
        //TODO logic.removeComment(productId, id)
        // .then(onRemoved)
        // .catch(error => {
        //   alert(error.message)

        //   console.error(error)
        // })
      } catch (error) {
        alert(error.message)

        console.error(error)
      }
  }
  return <li>
    <h4>{author.username}</h4>

    <p>{text}</p>

    <time>{getElapsedTime(date)}</time>

    {logic.getUserId() === author.id && <Button onClick={handleRemove}>🗑️</Button>}
  </li>
}