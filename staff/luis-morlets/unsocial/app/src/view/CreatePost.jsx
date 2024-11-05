import { Form, Label, Input, Button, Field } from '../components/library'

import './CreatePost.css'

import logic from '../logic'

export default ({ onCreatePost }) => {

    console.log('CreatePost -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            image: { value: image },
            text: { value: text }
        } = form

        try {
            logic.createPost(image, text, error => {
                if (error) {
                    alert(error.message)

                    console.log(error)

                    return
                }
                onCreatePost()
            })

        } catch (error) {
            alert(error.message)

            console.log(error)
        }
    }

    return <main className="CreatePost">
        <h3>Create Post</h3>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="image">Image</Label>
                <Input type="text" id="image" required={true} />
            </Field>

            <Field>
                <Label htmlFor="text">Text</Label>
                <Input type="text" id="text" required={true} />
            </Field>

            <Button type="submit" className="">Create</Button>
        </Form>
    </main>
}