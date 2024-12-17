import { Label, Button, Form, Field } from '../library'

import logic from '../../logic'

export default function AddComment({ productId, onAdded }) {
  const handleSubmit = event => {
    event.preventDefault()

    const form = event.target

    const { text: { value: text } } = form

    try {
      logic.addComment(productId, text)
        .then(() => {
          form.reset()

          onAdded()
        })
        .catch(error => {
          alert(error.message)

          console.error(error)
        })
    } catch (error) {
      alert(error.message)

      console.error(error)
    }
  }

  return <Form className="w-fit" onSubmit={handleSubmit}>
    <div className="flex justify-center items-center flex-col gap-1rem w-full">
      <Label htmlFor="text">New comment</Label>
      <textarea className="bg-[var(--textarea-color)] w-[90%]" id="text"></textarea>
    </div>

    <Button type="submit">Send</Button>
  </Form>
}