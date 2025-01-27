import logic from '../logic'

import { Label, Input, Button, Form, Field } from '../components/library'
import './CreatePost.css'

export default function CreatePost({ onCreated }) {

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            image: { value: image },
            text: { value: text }
        } = form

        try {
            logic.createPostLogic(image, text, error => {
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

    return <main className='CreatePost'>
        <h3>Create Post</h3>

        <Form onSubmit={handleSubmit}>
            <Label htmlFor="image">Image</Label>
            <Input type="text" id="image" />

            <Label htmlFor="image">Text</Label>
            <Input type="text" id="text" />

            <Button type="submit"><strong>CREATE</strong></Button>

        </Form>
    </main >
}
