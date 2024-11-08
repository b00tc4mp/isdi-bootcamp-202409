import logic from '../logic'

import { Label, Input, Button, Form, Field } from '../components/library'
import './CreatePost.css'

export default ({ onCreated }) => {
    console.log('CreatePost -> render')

    return <main className="CreatePost">
        <Form onSubmit={event => {
            event.preventDefault()


            const { target: form } = event

            const {
                image: { value: image },
                text: { value: text }
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
                <label htmlFor="image">Image</label>
                <input type="text" id="image" style={{ width: '100%', boxSizing: 'border-box' }} />
            </Field>

            <Field>
                <label htmlFor="text">Text</label>
                <input type="text" id="text" />
            </Field>

            <Button type="submit">Create</Button>
        </Form>
    </main>
}

