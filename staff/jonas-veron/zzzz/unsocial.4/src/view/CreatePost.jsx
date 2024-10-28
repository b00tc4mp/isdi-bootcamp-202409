import logic from '../logic'    
import { Button, Label, Input, Form, Field } from '../components/library'

import './CreatePost.css'

export default ({ onCreated }) => {
    console.log('CreatePost -> render')

    return <main className="CreatePost">

        <h3>Create Post</h3>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text}
            } = form

            try {
                logic.createPost(image, text)

                onCreated()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <Field>
            <Label htmlFor="image">Image</Label>
            <Input type="text" id="image"/>
            </Field>

            <Field>
            <Label htmlFor="text">Text</Label>
            <Input type="text" id="text"/>
            </Field>

            <Button type="submit" className="Button">Create</Button>
        </Form>
    </main>
}