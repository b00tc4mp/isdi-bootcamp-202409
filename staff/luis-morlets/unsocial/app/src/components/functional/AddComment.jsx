import { Form, Field, Label, Button } from '../library'

import logic from '../../logic'

import { errors } from 'com'

const { SystemError } = errors

export default function AddComment({ postId, onAdded }) {
    console.log('AddComment -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const { text: { value: text } } = event.target

        try {
            logic.createComment(text, postId, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
                    else
                        alert(error.message)

                    console.error(error)
                }
                event.target.reset()
                onAdded()
            })
        } catch (error) {
            alert(error.message)

            console.log(error)
        }
    }

    return <Field>
        <Form onSubmit={handleSubmit}>
            <Label htmlFor="text">New comment</Label>
            <textarea className="w-full box-border h-7 bg-gray-400 border-2" id="text"></textarea>

            <Button className="w-fit self-end mr-2 bg-[dimgrey] border-solid border-[lightgrey] border rounded-lg text-xxs text-[lightgrey] text-center p-1" type="submit">Send</Button>
        </Form>
    </Field>
}