import { Form, Field, Label, Button } from '../library'

import logic from '../../logic'

export default ({ postId, onAdded }) => {
    console.log('AddComment -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const { text: { value: text } } = event.target

        try {
            logic.createComment(text, postId, error => {
                if (error) {
                    alert(error.message)

                    console.error(error)
                }
                event.target.reset()
                onAdded()
            })
        } catch (error) {
            alert(error.message)

            console.log(error)
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