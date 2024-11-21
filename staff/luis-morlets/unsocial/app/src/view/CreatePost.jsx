import { Form, Label, Input, Button, Field } from '../components/library'

import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

export default function CreatePost({ onCreatePost }) {

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
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
                    else
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

    return <main className="flex flex-col justify-center items-center bg-blue-500 rounded-lg border-black border-2 gap-7 p-1 mx-8">
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

            <Button type="submit" className=" w-fit self-end mr-2 bg-[dimgrey] border-solid border-[lightgrey] border rounded-lg text-xxs text-[lightgrey] text-center p-1">Create</Button>
        </Form>
    </main>
}