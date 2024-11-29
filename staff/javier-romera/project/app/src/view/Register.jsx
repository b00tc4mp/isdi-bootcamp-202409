import { Form, Field, Label, Input, Button, Anchor } from './library'

import { errors } from 'com'
const { SystemError } = errors

import logic from '../logic'

export default function Register(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            username: { value: username },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat }
        } = form

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => {
                    form.reset()

                    alert('User successfully registered', 'success')

                    props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)
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
        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" autoComplete="on"></Input>
            </Field>

            <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" autoComplete="on"></Input>
            </Field>

            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" autoComplete="on"></Input>
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" autoComplete="off"></Input>
            </Field>

            <Field>
                <Label htmlFor="passwordRepeat">Confirm password</Label>
                <Input type="password" id="password-repeat" autoComplete="off"></Input>
            </Field>

            <Button type="submit">Register</Button>
        </Form>

        <Anchor href="" onClick={handleLoginClick}>Login</Anchor>
    </main>
}