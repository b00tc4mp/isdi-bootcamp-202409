import logic from "../../../logic/index.js"
import useLiterals from "../../useLiterals"

import useContext from "../../useContext"

export default function AddComment({ eventId, onCommentAdded }) {
  const { alert } = useContext()
  const literals = useLiterals()

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const text = form.text.value

    try {
      logic
        .addComment(eventId, text)
        .then(() => {
          form.reset()

          onCommentAdded()
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
    <form
      onSubmit={handleSubmit}
      className="mt-4 flex items-center border-t border-gray-600 pt-3"
    >
      <textarea
        name="text"
        id="text"
        placeholder="Añade un comentario..."
        className="text-white flex-1 resize-none text-sm bg-tertiary h-16 p-2"
      />
      <button
        type="submit"
        className="ml-2 bg-accentpink text-white py-1 px-3 rounded-lg hover:bg-accentgreen font-bold"
      >
        Añadir
      </button>
    </form>
  )
}
