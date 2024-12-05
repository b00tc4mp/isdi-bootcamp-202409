import { useState, useEffect } from "react"

import { Comment, AddComment } from "./index.js"

import logic from "../../../logic/index.js"

export default function Comments({ eventId, onAdded, onRemoved }) {
  const [comments, setComments] = useState([])

  useEffect(() => {
    console.log("Comments -> useEffect")

    try {
      logic
        .getComments(eventId)
        .then(setComments)
        .catch((error) => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }, [])

  const handleAdded = () => {
    try {
      logic
        .getComments(eventId)
        .then((comments) => {
          setComments(comments)

          onAdded()
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

  const handleRemoved = () => {
    try {
      logic
        .getComments(eventId)
        .then((comments) => {
          setComments(comments)

          onRemoved()
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
    <section>
      <ul>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            eventId={eventId}
            onRemoved={handleRemoved}
          />
        ))}
      </ul>

      <AddComment eventId={eventId} onAdded={handleAdded} />
    </section>
  )
}
