import { Anchor, Button, Field, Form, Input, Label } from './library'
import logic from "../logic"
import { errors } from 'com'
import useContext from './useContext'

const { SystemError } = errors

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

    const handlePartnerAccessClick = event => {
        event.preventDefault()

        props.onPartnerAccessClick()
    }

    return <main className="justify-self-center">
        <h2>Register</h2>

        <Form onSubmit={handleSubmit}>

            <Field>
                <Label htmlFor="name">First name</Label>
                <Input type="text" id="name" />
            </Field>

            <Field>
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" />
            </Field>

            <Field>
                <Label htmlFor="password-repeat">Repeat password</Label>
                <Input type="password" id="password-repeat" />
            </Field>

            <Button type="submit">Register</Button>
        </Form>

        <Anchor href="" onClick={handleLoginClick}>Login instead</Anchor>

        <div className="flex flex-row fixed top-full left-1/2 transform -translate-x-1/2 -translate-y-2/4 z-[-1]">
            <div className="w-40 h-40 bg-[var(--orange-color)] rounded-full"></div>
            <div className="w-40 h-40 bg-[var(--orange-color)] rounded-full"></div>
            <div className="w-40 h-40 bg-[var(--orange-color)] rounded-full"></div>
        </div>
    </main>
}