import { Label, Button, Form, Field } from "../library"

import logic from "../../../src/logic"

import useContext from "../../view/useContext.js"

export default function AddComment({ postId, onAdded }) {
  console.log("AddComment -> render")

  const { alert } = useContext()

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
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="text">New Comment</Label>
        <textarea id="text"></textarea>
      </Field>

      <Button type="submit">Send</Button>
    </Form>
  )
}
