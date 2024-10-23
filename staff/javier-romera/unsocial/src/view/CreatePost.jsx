import './CreatePost.css'

import logic from '../logic'

import { Form, Field, Label, Input, Button } from '../components/library'

function CreatePost({ onCreated }) {
    return <div className="CreatePost">
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

                onCreated()
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }}>
            <Field>
                <Label htmlFor="image">Image</Label>
                <Input type="text" id="image"></Input>
            </Field>

            <Field>
                <Label htmlFor="text">Text</Label>
                <Input type="text" id="text"></Input>
            </Field>

            <Button type="Submit">Create</Button>
        </Form>
    </div>
}

export default CreatePost