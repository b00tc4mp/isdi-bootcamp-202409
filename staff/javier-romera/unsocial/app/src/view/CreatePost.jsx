import logic from '../logic'

import { Form, Field, Label, Input, Button } from '../components/library'

import './CreatePost.css'

export default ({ onCreated }) => {
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

    return <main className="CreatePost">
        <h3>Create Post</h3>

        <Form onSubmit={handleSubmit}>
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
    </main>
}