import logic from "../logic"
import './CreatePost.css'
import { Button, Form, Label, Input } from "../components/biblio"

function CreatePost({ onCreated }) {
  console.log('Create Post -> render')

  const handleSubmit = event => {
    event.preventDefault()

    const { target: form } = event

    const {
      image: { value: image },
      text: { value: text }
    } = form

    try {
      logic.createPost(image, text, error => {
        if (error) {
          alert(error.message)
          console.error(error)
          return
        }
        onCreated()
      })
    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  return (
    <main className="CreatePost">
      <Form onSubmit={handleSubmit}>
        <h2>Create a Post</h2>
        <Label htmlFor="image">Image</Label>
        <Input type="text" id="image" placeholder="Select an image" required />
        <Label htmlFor="image">Text</Label>
        <Input type="text" id="text" placeholder="Write a text" required />
        <Button id="submit" type="submit">Create</Button>
      </Form>
    </main>
  )
}

export default CreatePost