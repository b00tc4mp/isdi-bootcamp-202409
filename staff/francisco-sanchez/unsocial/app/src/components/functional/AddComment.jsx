import { Label, Button, Form, Field } from "../library"

import logic from "../../logic"

export default ({ postId, onAdded }) => {
    console.log('AddComment -> render')

    const handleSubmit = event => {
        event.preventDefault()

        /**
         * const form = event.target asigna el formulario en sí 
         * (el elemento <Form>) a la variable form, y permite acceder a 
         * los elementos dentro de él.
         */
        const form = event.target

        const { text: { value: text } } = form

        try {
            logic.addComment(postId, text, error => {
                if (error) {
                    alert(error.message)
                    console.error(error)
                    return
                }

                form.reset()
                onAdded()
            })

        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    return <Form onSubmit={handleSubmit}>
        <Field>
            <Label htmlFor="text">New comment</Label>
            <textarea id="text"></textarea>
        </Field>
        <Button type="submit">Send</Button>

    </Form>
}