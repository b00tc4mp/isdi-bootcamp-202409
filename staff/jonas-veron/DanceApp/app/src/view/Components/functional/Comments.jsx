import { useState, useEffect } from "react"
import useLiterals from "../../useLiterals"
import { Comment, AddComment } from "./index.js"
import logic from "../../../logic/index.js"
import useContext from "../../useContext"

export default function Comments({ eventId, refreshEvents, onClose }) {
  const [comments, setComments] = useState([])

  const { alert } = useContext()
  const literals = useLiterals()

  useEffect(() => {
    refreshComments()
  }, [])

  const refreshComments = () => {
    try {
      logic
        .getComments(eventId)
        .then((comments) => {
          setComments(comments)
          refreshEvents()
        })
        .catch((error) => {
          alert(literals(error.message))

          console.error(error)
        })
    } catch (error) {
      alert(literals(error.message))

      console.error(error)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
      {/** Contenido principal del modal */}
      <div className="w-full max-w-lg bg-secondary rounded-t-2xl p-4 shadow-lg h-3/4 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-gray-600 pb-3">
          <h2 className="text-lg font-semibold text-white">Comentarios</h2>
          <button
            className="text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <ul className="flex-1 space-y-4 mt-4">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              eventId={eventId}
              comment={comment}
              onCommentRemoved={refreshComments}
            />
          ))}
        </ul>

        <AddComment eventId={eventId} onCommentAdded={refreshComments} />
      </div>
    </div>
  )
}
