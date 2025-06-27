import { PasswordInput, Input, Button, Form, Field, Label, Anchor } from '../components/library'
import { errors } from 'com'
import './Register.css'
import logic from '../logic'
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
            ["passwordRepeat"]: { value: passwordRepeat }
        } = form

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => {
                    form.reset()

                    props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('See you later aligator')
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

        props.logBack()
    }


    return <section className='Register'>
        <h2 class="text-center text-[18px] text-[#333]">Register</h2>

        <Form onSubmit={handleSubmit}>

            <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" />
            </Field>

            <Field>
                <Label htmlFor="email">E-mail</Label>
                <Input type="text" id="email" />
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
                <Label htmlFor="passwordRepeat">Repeat Password</Label>
                <PasswordInput id="passwordRepeat" />
            </Field>

            <Button type="submit">Register</Button>
        </Form>

        <Anchor href="" onClick={handleLoginClick}>Login</Anchor>
    </section >

}
