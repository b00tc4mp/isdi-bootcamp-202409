import { Input, Button, Form, Field, Label } from '../library'
import logic from '../../logic'
import { errors } from 'com'
import useContext from '../useContext'

const { SystemError } = errors

export default function NameDOBStage(props) {
    console.log('NameDOBStage -> render')

    const { alert, confirm } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { name: { value: name }, dateOfBirth: { value: dateOfBirth } } } = event

        const birthDate = new Date(dateOfBirth)
        if (isNaN(birthDate.getTime())) {
            alert('Invalid date. Please enter a valid date (YYYY-MM-DD)')

            return
        }

        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }

        if (age < 18) {
            alert('You must be at least 18 years old')
            return
        }

        confirm(
            <div>
                <strong>Confirm you're {age}</strong><br />
                You can't change this later.
            </div>,
            confirmed => {
                if (!confirmed) return

                logic.updateUser({ name, dateOfBirth })
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
            }
        )
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
                    <Input type="text" id="dateOfBirth" placeholder="YYYY-MM-DD" />
                </Field>

                <Button type="submit">Next</Button>
            </Form>
        </main>
    )
}