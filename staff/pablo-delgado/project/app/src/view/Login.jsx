import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import { errors } from 'com'
import logic from './../logic'

const { SystemError } = errors

export default function Login(props) {
    console.log('Login -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            logic.loginUser(email, password)
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
    
    const handleRegisterClick = event => {
        event.preventDefault()
        props.onRegisterClick()
    }

    return (
        <main className="flex flex-col justify-center items-center h-screen w-full bg-[#e9d8a6]">

            <h2 className="text-4xl font-bold mb-6">Login</h2>
      
            <Form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 mx-auto">
                <Field>
                    <Label htmlFor="email" className="block mb-1 text-sm font-medium">E-mail</Label>
                    <Input type="text" id="email" className="w-full p-2 border border-gray-300 rounded-2xl" />
                </Field>
      
                <Field>
                    <Label htmlFor="password" className="block mb-1 text-sm font-medium">Password</Label>
                    <PasswordInput id="password" className="w-full p-2 border border-gray-300 rounded-2xl" />
                    {/*<a href="/forgot-password" className="text-blue-500 text-sm mt-1 inline-block hover:underline">Forgot password?</a>*/}
                </Field>
      
                <Button type="submit" className="Button">Login</Button>

            </Form>

            <p className="mt-4 text-sm text-gray-600">Don't have an account?</p>
            <a href="" onClick={handleRegisterClick} className="text-blue-500 hover:underline">Sign Up</a>
        </main>
    )
}
