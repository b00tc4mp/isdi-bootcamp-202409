import createPost from "../logic/createPost"
import './CreatePost.css'
import { Button, Form, Label, Input } from "../components/biblio"

function CreatePost({ onCreated }) {
  return (
    <main className="CreatePost">
      <Form onSubmit={event => {
        event.preventDefault()
        const { target: form } = event

        const {
          image: { value: image },
          text: { value: text }
        } = form

        try {
          createPost(image, text)
          form.reset()
          onCreated()
        } catch (error) {
          alert(error.message)
          console.error(error)
        }
      }}>
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