import { PasswordInput, Input, Button, Form, Field, Label } from './library'
import { useNavigate } from 'react-router-dom'


import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

export default function Login(props) {
    console.log('Login -> render')
    const navigate = useNavigate();
    const handleSubmit = async event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            await logic.loginUser(email, password)
                .then(() => {
                    event.target.reset()

                    props.onLoggedIn()
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

    const handleRoleSelection = event => {
        event.preventDefault()
        navigate('/select-role-type')
    }

    return (
    <main className="flex flex-col justify-center items-center h-screen p-7 bg-gray-50 mt-3">
        <h2 className="text-3xl font-bold text-center mb-5">Let's <span className="text-yellow-500">Dive</span> you <span className="text-yellow-500">in</span></h2>
        <p className="text-center mb-7 text-600">Discover the World <span className="block"> with Every Sign In 🤿</span></p>

    
        <Form onSubmit={handleSubmit} className="flex flex-col gap-y-4">

        <Field>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" />
        </Field>

        <Field>
            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" />
        </Field>

            <Button type="submit">Login</Button>
        
        </Form>

        
        <p className="text-center mb-1 text-600">I don't have an account?</p>
        <Button onClick={handleRoleSelection}>Register</Button>
        
    </main>
    )
}