import { useState } from 'react'
import { PasswordInput, Input, PrimaryButton, Form, Field, Label } from './library'
import logic from '../logic'
import useContext from './useContext'

export default function Login(props) {
    const { alert } = useContext()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()

        if (isSubmitting) return

        const { target: { email: { value: email }, password: { value: password } } } = event

        setIsSubmitting(true)

        try {
            logic.loginUser(email, password)
                .then(() => {
                    event.target.reset()
                    props.onLoggedIn()
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

    const handleRegisterClick = event => {
        event.preventDefault()
        props.onRegisterClick()
    }

    return (
        <main className="flex items-center justify-center min-h-full p-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-darkest-blue mb-2">Welcome back!</h2>
                    <p className="text-dark-blue">Log in to find your only one</p>
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
                            placeholder="Enter your password"
                            required
                            disabled={isSubmitting}
                        />
                    </Field>

                    <PrimaryButton
                        className="bg-pink mt-3"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Log In
                    </PrimaryButton>
                </Form>

                <p className="text-center mt-6 text-dark-blue">
                    Don't have an account? {' '}
                    <a
                        href="#"
                        onClick={handleRegisterClick}
                        className="text-pink font-semibold"
                    >
                        Sign up here
                    </a>
                </p>
            </div>
        </main>
    )
}