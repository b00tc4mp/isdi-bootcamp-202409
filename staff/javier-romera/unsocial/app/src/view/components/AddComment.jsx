import { Button, Form, Field } from '../library'

import logic from '../../logic'

import { errors } from 'apu'

const { SystemError } = errors

export default function AddComment({ postId, onAdded }) {
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { text: { value: text } } = form

        try {
            logic.addComment(postId, text)
                .then(() => {
                    form.reset()

                    onAdded()
                })
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

    return <Form classname="gap-10 my-4" onSubmit={handleSubmit}>
        <Field classname>
            <textarea className="w-full" placeholder="Comment" id="text"></textarea>
        </Field>

        <Button classname="px-2 border border-gray-500" type="submit">Send</Button>
    </Form>
}