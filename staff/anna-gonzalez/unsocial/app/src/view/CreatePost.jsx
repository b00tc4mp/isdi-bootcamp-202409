import logic from '../logic'
import { Label, Input, Button, Form, Field } from './library'
import './CreatePost.css'
import { errors } from 'com'

const { SystemError } = errors

export default ({ onCreated }) => {
    console.log('CreatePost -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            image: { value: image },
            text: { value: text }
        } = form

        try {
            logic.createPost(image, text)
                .then(onCreated)
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <main className="CreatePost">
        <Form className="create-post-form" onSubmit={handleSubmit}>
            <h3>Create post</h3>

            <Field>
                <Label htmlFor="image">Image</Label>
                <Input type="text" id="image" />
            </Field>
            <Field>
                <Label htmlFor="text">Text</Label>
                <Input type="text" id="text" />
            </Field>
            <Button type="submit">Create</Button>
        </Form>
    </main>
}