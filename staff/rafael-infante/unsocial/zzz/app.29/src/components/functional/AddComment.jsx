import logic from '../../logic'
import { Label } from '../biblio'

export default ({ postId, onAdded }) => {
  console.log('Render -> Add Comment')

  const handleSubmit = event => {
    event.preventDefault()

    const form = event.target

    const { text: { value: text } } = form

    try {
      logic.addComment(postId, text, error => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }
        form.reset()
        onAdded()

      })

    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  return <form onSubmit={handleSubmit}>
    <Label htmlFor="text">New comment</Label>
    <textarea id="text"></textarea>

    <button type="submit">Send</button>
  </form>
}