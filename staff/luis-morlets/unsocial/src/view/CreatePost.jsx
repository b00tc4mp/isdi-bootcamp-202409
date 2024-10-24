import { Form, Label, Input, Button, Field } from '../components/library'

import './CreatePost.css'

import logic from "../logic"

function CreatePost({ onCreatePost }) {
    return <main className="CreatePost">
        <h3>Create Post</h3>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
            } = form

            try {
                logic.createPost(image, text)

                onCreatePost()
            } catch (error) {
                alert(error.message)

                console.log(error)
            }
        }}>
            <Field>
                <Label htmlFor="image">Image</Label>
                <Input type="text" id="image" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />
            </Field>

            <Field>
                <Label htmlFor="text">Text</Label>
                <Input type="text" id="text" required={true} style={{ width: '100%', boxSizing: 'border-box' }} />
            </Field>

            <Button type="submit" className="">Create</Button>
        </Form>
    </main>
}

export default CreatePost