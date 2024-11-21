import logic from '../logic'

import { PasswordInput, Form, Label, Input, Button, Paragraph, Field } from '../components/library'

import { errors } from 'com'

const { SystemError } = errors

export default function Register(props) {

    console.log('Register -> render')

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
            logic.registerUser(name, email, username, password, passwordRepeat, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                }

                form.reset()

                props.onRegister()
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }
    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginLink()
    }

    return <main className="flex flex-col justify-center items-center bg-blue-500/[0.8] border-black border-2 rounded-lg mx-8 gap-2 p-2">
        <h2>Register</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="name">Name:</Label>
                <Input type="text" id="name" required={true} />
            </Field>

            <Field>
                <Label htmlFor="email">E-mail:</Label>
                <Input type="email" id="email" required={true} />
            </Field>

            <Field>
                <Label htmlFor="username">Username:</Label>
                <Input type="text" id="username" required={true} />
            </Field>

            <Field>
                <Label htmlFor="password">Password:</Label>
                <PasswordInput id="password" className="pr-8" />
            </Field>

            <Field>
                <Label htmlFor="password-repeat">Repeat Password:</Label>
                <PasswordInput id="password-repeat" className="pr-8" />
            </Field>

            <Button type="submit" className="w-fit self-end mr-2 bg-[dimgrey] border-solid border-[lightgrey] border rounded-lg text-xxs text-[lightgrey] text-center p-1">Register</Button>
        </Form>

        <Paragraph className="text-xs text-center">Already have an account? <a href="" onClick={handleLoginClick}>Login</a></Paragraph>
    </main>
}