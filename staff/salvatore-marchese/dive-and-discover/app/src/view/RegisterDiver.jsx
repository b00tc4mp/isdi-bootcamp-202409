import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic/users/index.js'

export default function Register(props) {
    console.log('RegisterDiver -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            password: { value: password },
            ['password-repeat'] : { value: passwordRepeat }
        } = form

        try {
            logic.registerUserDiver(name, email,  password, passwordRepeat, error => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                form.reset()

                props.onRegistered()
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    return <main>
        <h2 className="mt-14">Register as Diver</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" />
            </Field>

            <Field>
                <Label htmlFor="email">E-mail</Label>
                <Input type="email" id="email" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Field>
                <Label htmlFor="password-repeat">Repeat Password</Label>
                <PasswordInput id="password-repeat" />
            </Field>

            <Button  type="submit">Register</Button>
        </Form>

        <a href="" onClick={handleLoginClick}>Login</a>
    </main>
}