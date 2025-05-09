import { Form, Field, Label, Button } from '../library'

import logic from '../../logic'


export default ({ postId, onAdded }) =>
    <Form onSubmit={event => {
        event.preventDefault()

        const { text: { value: text } } = event.target

        try {
            logic.createComment(text, postId)

            event.target.reset()

            onAdded()
        } catch (error) {
            alert(error.message)

            console.log(error)
        }
    }}>
        <Field>
            <Label htmlFor="text">New comment</Label>
            <textarea id="text"></textarea>
        </Field>

        <Button type="submit">Send</Button>
    </Form>