import { PasswordInput, Input, Button, Form, Field, Label } from '../library/index.js'

import logic from '../../logic/users/index.js'

export default function Register(props) {
    console.log('RegisterDiver -> render')

    const handleSubmit = async event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            password: { value: password },
            ['password-repeat'] : { value: passwordRepeat }
        } = form

        try {
            await logic.registerUserDiver(name, email, password, passwordRepeat)
            form.reset()
            props.onRegistered()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    return (
        <main 
            className="flex flex-col justify-center items-center h-screen"
            style={{ backgroundImage: "url('https://www.treehugger.com/thmb/OLxBN3vbTzvgFCeUdlyIMXxu_M8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1279110759-d280cdc3b0b842c2bde02b8e5f7238a8.jpg')" }}
        >
            <div className="bg-gray-100 shadow-md p-4 rounded-lg max-w-md flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center mb-5">Register as <span className="text-yellow-500">Diver</span></h2>

                <Form onSubmit={handleSubmit} className="flex flex-col gap-y-4 w-full">
                    <Field>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name"/>
                    </Field>

                    <Field>
                        <Label htmlFor="email">E-mail</Label>
                        <Input type="email" id="email" name="email"/>
                    </Field>

                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput id="password" name="password"/>
                    </Field>

                    <Field>
                        <Label htmlFor="password-repeat">Repeat Password</Label>
                        <PasswordInput id="password-repeat" name="password-repeat"/>
                    </Field>

                    <Button type="submit" className="w-full sm:w-auto">Register</Button>
                </Form>

                <p className="text-center mb-1 text-600">Already have an account?</p>
                <a 
                    href="#"
                    onClick={handleLoginClick} 
                    className="text-blue-500 hover:text-blue-700"
                >
                    Login
                </a>
            </div>
        </main>
    );
}