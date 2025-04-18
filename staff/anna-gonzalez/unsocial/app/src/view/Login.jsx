import { PasswordInput, Input, Button, Form, Field, Label, Anchor } from './library'
import logic from '../logic'
import { errors } from 'com'
import useContext from './useContext'

const { SystemError } = errors

export default function Login(props) {
    console.log('Login -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset()

                    props.onLoggedIn()
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
            <Button type="submit" className="mt-4 w-[160px] box-border px-5 py-[5px] font-dela-gothic-one bg-[#2A31FF] rounded-[25px] border-0 text-lg mb-4 text-white cursor-pointer hover:bg-[#0a11cc]">Login</Button>
        </Form>
        <Anchor href="" onClick={handleRegisterClick}>Register</Anchor>

    </main>
}