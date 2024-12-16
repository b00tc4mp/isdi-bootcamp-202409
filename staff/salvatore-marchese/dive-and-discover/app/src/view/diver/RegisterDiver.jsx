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

        /* try {
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
        } */
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

            <Button  type="submit">Register</Button>
        </Form>

        <a href="" onClick={handleLoginClick}>Login</a>
    </main>
}