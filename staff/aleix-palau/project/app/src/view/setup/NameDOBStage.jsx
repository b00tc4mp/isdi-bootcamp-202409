import { Input, Button, Form, Field, Label } from '../library'
import logic from '../../logic'
import { errors } from 'com'

const { SystemError } = errors

import useContext from '../useContext' // per l'alerta de name i age

export default function NameDOBStage(props) {
    console.log('NameDOBStage -> render')

    const { alert, confirm } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { name: { value: name }, dateOfBirth: { value: dateOfBirth } } } = event

        try {
            logic.updateUser({ name, dateOfBirth })
                .then(() => {
                    event.target.reset()

                    confirm('You\'re 33. You can\'t change this later.') // edit

                    props.onSetupComplete()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }


    return <main className="justify-self-center">
        <h2>Hey, you! Let's start with an intro</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="name">What's your first name?</Label>
                <Input type="text" id="name" placeholder="Your first name" />
            </Field>

            <Field>
                <Label htmlFor="dateOfBirth">What's your birthday?</Label>
                <Input type="date" id="dateOfBirth" />
            </Field>

            <Button type="submit">Next</Button>
        </Form>
    </main>
}