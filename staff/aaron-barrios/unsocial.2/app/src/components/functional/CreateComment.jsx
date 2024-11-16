import logic from '../../logic'

import { Label, Form } from '../library'

export default ({ postId, onAdded }) => {
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { text: { value: text } } = form

        try {
            logic.createComment(postId, text)

            form.reset()

            onAdded()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <Form onSubmit={handleSubmit}>
        <Label htmlFor="text">New comment</Label>
        <p></p>
        <textarea id="text"></textarea>

        <p></p>
        <button type="submit">Send</button>
    </Form>
}