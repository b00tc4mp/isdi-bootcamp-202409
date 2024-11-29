import { Button } from "../library"

import logic from "../../logic"

import { getElapsedTime } from "../../utils/index.js"

import useContext from "../../view/useContext.js"

import "./Comment.css"

export default function Comment({
  postId,
  comment: { id, author, text, date },
  onRemoved,
}) {
  console.log("Comment -> render")

  const { alert, confirm } = useContext()

  const handleRemove = () => {
    confirm("Delete comment?", (accepted) => {
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
      <div className="UsernameComments">
        <p>
          <b>{author.username} </b>
          {text}
        </p>
        <time>{getElapsedTime(date)}</time>
      </div>

      {logic.getUserId() === author.id && (
        <Button onClick={handleRemove}>🗑️</Button>
      )}
    </li>
  )
}
