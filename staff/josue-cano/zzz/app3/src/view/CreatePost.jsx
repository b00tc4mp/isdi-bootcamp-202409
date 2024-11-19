import logic from '../logic'

import { Label, Input, Button, Form, Field } from '../components/library'

import './CreatePost.css'

export default ({ onCreated }) => {
    console.log('CreatePost -> render')

    const handleSubmit = event => {
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
    }

    return <main className="CreatePost">
        <Form onSubmit={handleSubmit}>
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