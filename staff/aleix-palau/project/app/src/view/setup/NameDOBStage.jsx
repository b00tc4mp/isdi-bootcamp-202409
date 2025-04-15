import { Form, Field, Label, Input, PrimaryButton } from '../library'
import logic from '../../logic'
import { errors } from 'com'
import useContext from '../useContext'
import { calculateAge } from '../../util'

const { SystemError } = errors

export default function NameDOBStage(props) {
    console.log('NameDOBStage -> render')

    const { alert, confirm } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { name: { value: name }, dateOfBirth: { value: dateOfBirth } } } = event

        const age = calculateAge(dateOfBirth)

        if (isNaN(age)) {
            alert('Enter a valid date (DD-MM-YYYY).', 'error', 'Invalid Date')

            return
        }

        if (age < 18) {
            alert(null, 'error', 'You must be at least 18 years old')

            return
        }

        if (age >= 100) {
            alert("You should NOT be here💀")

            return
        }

        confirm('Make sure this is correct as you won\'t be able to change it later.',
            confirmed => {
                if (!confirmed) return

                logic.updateUserProfile({ name, dateOfBirth })
                    .then(() => logic.updateUserStage('gender'))
                    .then(() => {
                        event.target.reset()

                        props.onSetupComplete()
                    })
                    .catch(error => {
                        if (error instanceof SystemError)
                            alert('Sorry, try again later.')
                        else
                            alert(error.message)

                        console.error(error)
                    })
            }, 'warn', `${name}, you're ${age} years old`)
    }

    return (
        <main className="justify-self-center">
            <h2>Hey, you! Let's start with an intro</h2>

            <Form onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="name">What's your first name?</Label>
                    <Input type="text" id="name" placeholder="Your first name" />
                </Field>

                <Field>
                    <Label htmlFor="dateOfBirth">What's your birthday?</Label>
                    <Input
                        type="date"
                        id="dateOfBirth"
                        max={new Date().toISOString().split('T')[0]}
                        placeholder="YYYY-MM-DD"
                    />
                </Field>

                <PrimaryButton type="submit">Next</PrimaryButton>
            </Form>
        </main>
    )
}
// TODO: validacio amb no mes old que Date.now => aixo (27-02-19989) ho pilla com si fos menor d 18