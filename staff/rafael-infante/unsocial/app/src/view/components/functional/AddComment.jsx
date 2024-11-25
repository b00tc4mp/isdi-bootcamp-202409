import logic from '../../../logic'
import { Label } from '../library'

export default ({ postId, onAdded }) => {
  console.log('Render -> Add Comment')

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.target

    const {
      text: { value: text },
    } = form

    try {
      logic
        .addComment(postId, text)
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
      <Label htmlFor="text">New comment</Label>
      <textarea id="text"></textarea>

      <button type="submit">Send</button>
    </form>
  )
}
