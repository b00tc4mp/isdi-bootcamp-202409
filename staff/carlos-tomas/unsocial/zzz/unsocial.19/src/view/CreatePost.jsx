import './CreatePost.css'

import { Label, Input, Form, Field, Button } from '../components/library'

import logic from '../logic'

function CreatePost({ onCreated }) {
    console.log('CreatePost -> render')

    return <main className='CreatePost'>
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
                <Input type="text" id="image" />
            </Field>
            <Field>
                <Label htmlFor="text">Text</Label>
                <Input type="text" id="text" />
            </Field>
            <Button type="submit">Create</Button>
        </Form>
    </main>
}

export default CreatePost