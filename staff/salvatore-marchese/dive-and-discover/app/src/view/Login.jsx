import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import { useNavigate } from 'react-router-dom'

import logic from '../logic'

import { errors } from '../../../com'

export default function Login(props) {
    console.log('Login -> render')

    const navigate = useNavigate()

    const handleSubmit = async event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            await logic.loginUser(email, password, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Try again later.')
                else
                    alert(error.message)

                console.error(error)

                return
                }

                event.target.reset()

                props.onLoggedIn()
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRoleSelection = event => {
        event.preventDefault()
        navigate('/select-role-type')
    }

    return (
    <main className="flex flex-col justify-center items-center h-screen p-7 bg-gray-50 mt-3">
        <h2 className="text-3xl font-bold text-center mb-5">Let's <span className="text-yellow-500">Dive</span> you <span className="text-yellow-500">in</span></h2>
        <p className="text-center mb-7 text-600">Discover the World <span className="block"> with Every Sign In 🤿</span></p>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <Form onSubmit={handleSubmit}>
        <Field className="mb-4">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </Field>

            <Field className="mb-6">
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>

        <div className="mt-4 text-center">
            <Button className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" type="submit">Login</Button>
        </div>
        </Form>

        <div className="mt-4 text-center">
            <p className="text-center mb-1 text-600">I don't have an account?</p>
        <Button className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition" onClick={handleRoleSelection}>Register</Button>
        </div>
        </div>
    </main>
    )
}