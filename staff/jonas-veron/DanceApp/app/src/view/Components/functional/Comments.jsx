import { useState, useEffect } from "react"

import { Comment, AddComment } from "./index.js"

import logic from "../../../logic/index.js"
import useContext from "../../useContext"

export default function Comments({ eventId, onClose, refreshEvents }) {
  const [comments, setComments] = useState([])

  const { alert } = useContext()

  useEffect(() => {
    console.log("Comments -> useEffect")
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
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-secondary rounded-t-2xl p-4 shadow-lg h-3/4 overflow-y-auto transition-transform transform translate-y-0 opacity-95 "
        onClick={(e) => e.stopPropagation()}
      >
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
              comment={comment}
              eventId={eventId}
              refreshComments={refreshComments}
            />
          ))}
        </ul>

        <AddComment eventId={eventId} refreshComments={refreshComments} />
      </div>
    </div>
  )
}
