import { PasswordInput, Input, Button, Form, Field, Label } from './library'
import { useNavigate } from 'react-router-dom'

import loginUser from '../logic/users/loginUser'

import { errors } from '../../../com'

const { SystemError } = errors

export default function Login(_props) {
    const navigate = useNavigate();

    console.log('Login -> render')
    const handleSubmit = async event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            await loginUser(email, password);
            event.target.reset();
            navigate('/home');
        } catch (error) {
            alert(error.message)
            if (error instanceof SystemError)
                alert('Sorry, try again later.')
            else
                alert(error.message)

            console.error(error)
        }
    }

    const handleRoleSelection = event => {
        event.preventDefault()
        navigate('/select-role-type')
    }

    return (
        <main className="flex flex-col justify-center items-center h-screen"
            style={{ backgroundImage: "url('https://www.treehugger.com/thmb/OLxBN3vbTzvgFCeUdlyIMXxu_M8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1279110759-d280cdc3b0b842c2bde02b8e5f7238a8.jpg')" }}>

            <div className="bg-gray-100 shadow-md p-4 rounded-lg max-w-md flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center mb-5">Let's <span className="text-yellow-500">Dive</span> you <span className="text-yellow-500">in</span></h2>
                <p className="text-center mb-7 text-600">Discover the World <span className="block"> with Every Sign In 🤿</span></p>

                <Form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full">
                    <Field>
                        <Label htmlFor="email">Email</Label>
                        <Input type="email" id="email" />
                    </Field>

                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput id="password" />
                    </Field>

                    {/* Centering the login button and making it the same size as the register button */}
                    <Button type="submit" className="mx-auto w-full sm:w-auto">Login</Button>
                </Form>

                <p className="text-center mb-1 text-600">I don't have an account?</p>
                {/* Centering the register button */}
                <Button onClick={handleRoleSelection} className="mx-auto sm:w-auto py-2 mt-4">Register</Button>
            </div>
        </main>
    )
}