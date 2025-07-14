import { useState } from 'react'
import { PasswordInput, Input, PrimaryButton, Form, Field, Label } from './library'
import logic from '../logic'
import useContext from './useContext'

export default function Register(props) {
    const { alert } = useContext()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()

        if (isSubmitting) return

        const { target: form } = event
        const {
            email: { value: email },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat }
        } = form

        setIsSubmitting(true)

        try {
            logic.registerUser(email, password, passwordRepeat)
                .then(() => {
                    form.reset()
                    alert(null, 'success', 'Registration successful')
                    props.onRegistered()
                })
                .catch(error => {
                    alert(error.message)
                    console.error(error)
                })
                .finally(() => {
                    setIsSubmitting(false)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
            setIsSubmitting(false)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()
        props.onLoginClick()
    }

    return (
        <main className="flex items-center justify-center min-h-full p-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-darkest-blue mb-2">Join heartbeat</h2>
                    <p className="text-dark-blue">Find your perfect match through music</p>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            required
                            disabled={isSubmitting}
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            placeholder="Enter a password (8 characters min.)"
                            required
                            disabled={isSubmitting}
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="password-repeat">Confirm password</Label>
                        <PasswordInput
                            id="password-repeat"
                            placeholder="Confirm your password"
                            required
                            disabled={isSubmitting}
                        />
                    </Field>

                    <PrimaryButton
                        className="bg-pink mt-3"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Sign Up
                    </PrimaryButton>
                </Form>

                <p className="text-center mt-6 text-dark-blue">
                    Already have an account? {' '}
                    <a
                        href="#"
                        onClick={handleLoginClick}
                        className="text-pink font-semibold"
                    >
                        Log in instead
                    </a>
                </p>
            </div>
        </main>
    )
}