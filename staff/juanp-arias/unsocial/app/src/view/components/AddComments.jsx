import { Button, Form, Label } from '../library'
import logic from '../../logic'
import './AddComments.css'
import useContext from '../useContext'

export default function AddComments({ postId, onAdded }) {
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { text: { value: text } } = form

        try {
            logic.addComments(postId, text)
                .then(() => {
                    form.reset()
                    onAdded()
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }
    return <Form onSubmit={handleSubmit}>
        <Label htmlfor="text">New comment</Label>
        <textarea id="text" required></textarea>

        <Button type="submit">Send</Button>
    </Form>
}


