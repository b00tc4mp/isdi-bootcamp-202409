import { PasswordInput, Form, Field, Label, Button, Paragraph, Input } from './library'

import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

import useContext from './useContext'

export default function Login(props) {

    console.log('Login -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            username: { value: username },
            password: { value: password }
        } = form

        try {
            logic.loginUser(username, password)
                .then(() => {
                    form.reset()

                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
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

        props.onRegisterLink()
    }

    return <main className="flex flex-col justify-center items-center bg-blue-500/[0.8] border-black border-2 rounded-lg mx-8 gap-7 p-2">
        <h2>Login</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="username">Username:</Label>
                <Input type="text" id="username" required={true} />
            </Field>

            <Field>
                <Label htmlFor="password">Password:</Label>
                <PasswordInput id='password' className="pr-8" />
            </Field>


            <Button type="submit" className=" w-fit self-end mr-2 bg-[dimgrey] border-solid border-[lightgrey] border rounded-lg text-xxs text-[lightgrey] text-center p-1">Login</Button>
        </Form>

        <Paragraph className="text-xs text-center">Don't have an account? <a href="" onClick={handleRegisterClick}>Register</a></Paragraph>
    </main>
}