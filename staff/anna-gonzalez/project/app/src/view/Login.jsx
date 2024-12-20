import { Anchor, Button, Field, Form, Input, Label } from './library'
import logic from '../logic'
import { errors } from 'com'
import useContext from './useContext'

const { SystemError } = errors

export default function Login(props) {
    const { alert } = useContext()

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

    return <main className="justify-self-center">
        <h2>Login</h2>

        <Form onSubmit={handleSubmit}>

            <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" />
            </Field>

            <Button type="submit">Login</Button>
        </Form>

        <Anchor href="" onClick={handleRegisterClick}>Register instead</Anchor>

        <div className="flex flex-row fixed top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[-1]">
            <div className="w-40 h-40 bg-[var(--orange-color)] rounded-full"></div>
            <div className="w-40 h-40 bg-[var(--orange-color)] rounded-full"></div>
            <div className="w-40 h-40 bg-[var(--orange-color)] rounded-full"></div>
        </div>
    </main>
}