import logic from '../logic'

import { Label, Input, Button, Form, Field } from './library'

export default function CreateNote({ onCreated }) {

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            text: { value: text }
        } = form

        try {
            logic.createNote(text)
                .then(onCreated)
                .catch(error => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    return <main className="CreatePost">
        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="text">Text</Label>
                <Input type="text" id="text" />
            </Field>
            <Button type="submit">Add note</Button>
        </Form>
    </main>
}