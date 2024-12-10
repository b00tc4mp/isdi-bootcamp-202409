import logic from "../../../logic/index.js"

import { getElapsedTime } from "../../../util"

export default function Comment({
  eventId,
  comment: { id, author, text, date },
  refreshComments,
}) {
  console.log("Comment -> render")

  const handleRemove = () => {
    if (window.confirm("Borrar comentario ?")) {
      try {
        logic
          .removeComment(eventId, id)
          .then(refreshComments)
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
    <li className="flex items-start space-x-3">
      <div className="w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center">
        {author.name[0].toUpperCase()}
      </div>
      <div className="flex-1 overflow-hidden text-left break-words">
        <p className="text-sm break-words whitespace-normal">
          <span className="font-bold text-white">{author.name} </span> {text}
        </p>
        <time className="text-xs text-gray-500">{getElapsedTime(date)}</time>
      </div>
      {logic.getUserId() === author.id && (
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      )}
    </li>
  )
}