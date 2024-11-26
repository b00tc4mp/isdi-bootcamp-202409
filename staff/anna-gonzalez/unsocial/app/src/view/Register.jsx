import { PasswordInput, Input, Button, Form, Field, Label, Anchor } from './library'
import logic from '../logic'
import { errors } from 'com'
import useContext from './useContext'

const { SystemError } = errors

export default function Register(props) {
    console.log('Register -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            username: { value: username },
            password: { value: password },
            passwordRepeat: { value: passwordRepeat }
        } = form

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => {
                    form.reset()

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

    return <main className="flex justify-center items-center flex-col h-full box-border bg-radial-custom bg-[120%_120%] animate-gradient">
        <Form onSubmit={handleSubmit}>
            <h2 class="font-dela-gothic-one pl-4 self-start	">Register</h2>
            <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" />
            </Field>
            <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </Field>
            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>
            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>
            <Field>
                <Label htmlFor="passwordRepeat">Confirm password</Label>
                <PasswordInput id="passwordRepeat" />
            </Field>

            <Button type="submit" className="mt-4 w-[185px] box-border px-5 py-[5px] font-dela-gothic-one bg-[#2A31FF] rounded-[25px] border-0 text-lg mb-4 text-white cursor-pointer hover:bg-[#0a11cc]">Register</Button>
        </Form>
        <Anchor href="" onClick={handleLoginClick}>Login</Anchor>
    </main >
}