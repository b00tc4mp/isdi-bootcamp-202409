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

    return  <main className="flex flex-col justify-center items-center h-screen w-full">
            <h2 className="text-7xl">Login</h2>
      
            <Form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 mx-auto">
              <Field>
                <Label htmlFor="email" className="block mb-1 text-sm font-medium">E-mail</Label>
                <Input type="text" id="email" className="w-full p-2 border border-gray-300 rounded" />
              </Field>
      
              <Field>
                <Label htmlFor="password" className="block mb-1 text-sm font-medium">Password</Label>
                <PasswordInput id="password" className="w-full p-2 border border-gray-300 rounded" />
              </Field>
      
              <Button type="submit" className="w-full text-[#F2F2F2] py-3 rounded text-lg font-bold">Login</Button>
            </Form>
      
            <p className="mt-4 text-sm text-gray-600">Don't you have an account?</p>
      
            <a href="" onClick={handleRegisterClick} className="text-blue-500 hover:underline">Register</a>

            <p className="mt-4 text-sm text-gray-600">Are you a partner?</p>
      
            <a href="" onClick={handleRegisterClick} className="text-blue-500 hover:underline">Register as a partner</a>
        </main>
}

