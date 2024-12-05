import logic from "../../../logic/index.js"

export default function AddComment({ eventId, onAdded }) {
  console.log("AddComment -> render")

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const text = form.text.value

    try {
      logic
        .addComment(eventId, text)
        .then(() => {
          form.reset()

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

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        name="text"
        id="text"
        placeholder="Escribe un comentario..."
        className="text-black"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Añadir Comentario
      </button>
    </form>
  )
}
