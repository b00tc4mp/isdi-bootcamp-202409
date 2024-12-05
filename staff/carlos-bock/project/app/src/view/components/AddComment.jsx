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

    return <Form onSubmit={handleSubmit}>
        <Field>
            <Label htmlFor='text'>Comentario</Label>
            <textarea id="text"></textarea>
        </Field>

        <Button type='submit'>Enviar</Button>
    </Form>
}