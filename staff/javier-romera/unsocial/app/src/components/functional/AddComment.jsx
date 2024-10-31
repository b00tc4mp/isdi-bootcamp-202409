import { Button, Form, Field } from '../library'

import logic from '../../logic'

import './AddComment.css'

export default ({ postId, onAdded }) => {
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { text: { value: text } } = form

        try {
            logic.addComment(postId, text)

            form.reset()

            onAdded()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    return <Form onSubmit={handleSubmit}>
        <Field>
            <textarea placeholder="Comment" id="text"></textarea>
        </Field>

        <Button classname="send-button" type="submit">Send</Button>
    </Form>
}