import {Label, Button, Form, Field } from '../library'

import logic from '../../logic'

const AddComment = ({postId, onAdded}) => {
    console.log('Add Comment -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const {text: {value: text}} = form

        try {
            logic.addComment(postId, text)

            form.reset()

            onAdded()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }
    
    return <Form onSubmit={{handleSubmit}}>
    <Field>
        <Label htmlFor="text">New Comment</Label>
        <textarea id="text"></textarea>
    </Field>

    <Button type="submit">Send</Button>
</Form>
}


export default AddComment