import { Button } from '../library'

import logic from '../../logic'

import { getElapsedTime } from '../../util'

export default function Comment({ productId, comment: { id, author, text, date }, onRemoved }) {

  const handleRemove = () => {
    if (confirm('Delete comment?'))
      try {
        logic.removeComment(productId, id)
          .then(onRemoved)
          .catch(error => {
            alert(error.message)

            console.error(error)
          })
      } catch (error) {
        alert(error.message)

        console.error(error)
      }
  }
  return <li className="shadow-lg">
    <h4 className="font-bold" >{author.username}</h4>

    <p className="font-thin">{text}</p>

    <time>{getElapsedTime(date)}</time>

    {logic.getUserId() === author.id && <button onClick={handleRemove}>🗑️</button>}
  </li>
}