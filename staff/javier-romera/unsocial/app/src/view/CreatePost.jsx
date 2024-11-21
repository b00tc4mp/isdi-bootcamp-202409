import logic from '../logic'

import { Form, Field, Label, Input, Button } from './library'

import { errors } from 'apu'

const { SystemError } = errors

export default function CreatePost({ onCreated }) {
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
                        alert('Sorry, try again later')
                    else
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

    return <main className="flex items-center flex-col h-9/10 bg-[black] mt-12 box-border">
        <h3 className="pt-6 pb-4 text-xl">Create Post</h3>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="image">Image</Label>
                <Input type="text" id="image" autoComplete="on"></Input>
            </Field>

            <Field>
                <Label htmlFor="text">Text</Label>
                <Input type="text" id="text" autoComplete="on"></Input>
            </Field>

            <Button type="Submit">Create</Button>
        </Form>
    </main>
}