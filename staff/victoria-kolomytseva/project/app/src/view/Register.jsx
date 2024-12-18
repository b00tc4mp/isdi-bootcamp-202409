import { errors } from 'com'

const { SystemError } = errors

import { PasswordInput, Input, Button, Form, Field } from './library'

import logic from '../logic'

import useContext from './useContext'

export default function Register(props) {
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat }
        } = form

        try {
            logic.registerUser(name, email, password, passwordRepeat)
                .then(() => {
                    form.reset()

                    alert('User successfully registered', 'success')

                    props.onRegistered()
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
    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    return <main className="flex justify-center items-center flex-col h-screen box-border bg-[url('./assets/background_login.jpg')] bg-no-repeat bg-cover">


        <Form onSubmit={handleSubmit}>
            <Field>

                <Input type="text" id="name"
                    placeholder="name" />
            </Field>

            <Field>
                <Input type="email" id="email"
                    placeholder="email" />
            </Field>

            <Field>
                <PasswordInput id="password"
                    placeholder="password" />
            </Field>

            <Field>
                <PasswordInput id="password-repeat"
                    placeholder="password-repeat" />
            </Field>

            <Button type="submit" className="from-primary-light to-primary-dark bg-gradient-to-b mt-10">Register</Button>
        </Form>
        <Button className=" bg-secondary mt-2 w-52" onClick={handleLoginClick}>Login</Button>

    </main>
}

