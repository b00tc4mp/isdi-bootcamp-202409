import { useState } from 'react'
import { Form, Field, Label, Input, PrimaryButton } from '../library'
import logic from '../../logic'
import useContext from '../useContext'
import { calculateAge } from '../../util'

export default function NameDOBStage(props) {
    const { alert, confirm } = useContext()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()

        if (isSubmitting) return

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
            alert("You should NOT be here💀", 'error', 'Invalid Age')
            return
        }

        confirm(
            'Make sure this is correct as you won\'t be able to change it later.',
            confirmed => {
                if (!confirmed) return

                setIsSubmitting(true)

                logic.updateUserProfile({ name, dateOfBirth })
                    .then(() => logic.updateUserStage('gender'))
                    .then(() => {
                        event.target.reset()
                        props.onSetupComplete()
                    })
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
                    .finally(() => {
                        setIsSubmitting(false)
                    })
            }, 'warn', `${name}, you're ${age} years old`)
    }

    return (
        <main className="flex items-center justify-center min-h-full p-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-darkest-blue mb-2">
                        Hey, you!
                    </h2>
                    <p className="text-dark-blue">
                        Tell us a bit about yourself
                    </p>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Field>
                        <Label htmlFor="name">What's your name again?</Label>
                        <Input
                            type="text"
                            id="name"
                            placeholder="Your first name"
                            required
                            disabled={isSubmitting}
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="dateOfBirth">What's your birthday?</Label>
                        <Input
                            type="date"
                            id="dateOfBirth"
                            max={new Date().toISOString().split('T')[0]}
                            placeholder="dd-mm-yyyy"
                            required
                            disabled={isSubmitting}
                        />
                    </Field>

                    <PrimaryButton
                        className="bg-pink mt-3"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Next
                    </PrimaryButton>
                </Form>
            </div>
        </main>
    )
}