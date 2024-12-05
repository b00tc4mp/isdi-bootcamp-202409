import logic from "../../../logic/index.js"

import { getElapsedTime } from "../../../util"

export default function Comment({
  eventId,
  comment: { id, author, text, date },
  onRemoved,
}) {
  console.log("Comment -> render")

  const handleRemove = () => {
    if (window.confirm("Borrar comentario ?")) {
      try {
        logic
          .removeComment(eventId, id)
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
  }
  return (
    <li>
      <p>
        <b>{author.name}</b>
        {text}
      </p>
      <time>{getElapsedTime(date)}</time>
      {logic.getUserId() === author.id && (
        <button onClick={handleRemove}>Eliminar comentario</button>
      )}
    </li>
  )
}
