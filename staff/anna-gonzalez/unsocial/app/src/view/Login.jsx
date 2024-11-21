import { PasswordInput, Input, Button, Form, Field, Label, Anchor } from './library'
import logic from '../logic'
import { errors } from 'com'

const { SystemError } = errors

export default function Login(props) {
    console.log('Login -> render')

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                }
                event.target.reset()

                props.onLoggedIn()
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

    return <main className="flex justify-center items-center flex-col h-full box-border bg-radial-custom bg-[120%_120%] animate-gradient"
    >
        <Form onSubmit={handleSubmit}>
            <h2 class="font-dela-gothic-one pl-4 self-start	">Login</h2>

            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>
            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>
            <Button type="submit" className="mt-4">Login</Button>
        </Form>
        <Anchor href="" onClick={handleRegisterClick}>Register</Anchor>

    </main>
}