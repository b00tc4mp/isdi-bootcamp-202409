import logic from '../logic'

import { Input, Button, Field, Label } from '../components/library'

import './CreatePost.css'

function CreatePost({ onCreated }) {
    console.log('CreatePost -> render')

    return <main className="CreatePost">
        <h3>Create post</h3>

        <form onSubmit={event => {
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
                <Label htmlFor="image">Image</Label>
                <Input type="text" id="image" />
            </Field>
            <Field>
                <Label htmlFor="text">Text</Label>
                <Input type="text" id="text" />
            </Field>
            <Button type="submit">Create</Button>
        </form>
    </main>
}

export default CreatePost