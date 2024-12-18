import Label from '../library/Label.jsx'; import Button from '../library/Button.jsx'
import Form from '../library/Form.jsx'; import Field from '../library/Field.jsx'

import logic from '../../logic/index.js'

export default function AddComment({ recommendId, onAdded }) {
    console.log('AddComment -> rener')

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { text: { value: text } } = form

        try {
            logic.addComment(recommendId, text)
                .then(() => {
                    form.reset()

                    onAdded()
                })
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <Form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <Field className='flex flex-col gap-2'>
            <Label htmlFor='text' className='text-lg font-medium text-neutralDark'>Comentario</Label>
            <textarea id="text" className='w-full p-2 border border-cardBorder rounded focus:outline-none focus:ring-2 focus:ring-primary'></textarea>
        </Field>

        <Button type='submit' className='self-start bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark'>Enviar</Button>
    </Form>
}