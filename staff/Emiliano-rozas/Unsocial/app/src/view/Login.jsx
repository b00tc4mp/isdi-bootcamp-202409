import { PasswordInput, Input, Button, Form, Field, Label, Anchor } from '../components/library'

import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

export default function Login(props) {
    console.log("Login -> render")

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
                        alert('Ni nos vimos perro')
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

        props.registerInquire()

    }

    return <section className='content-center max-w-96 mt-20 bord rounded-lg'>
        <h2 class="text-center text-[18px] text-[#333]">Login</h2>

        <Form onSubmit={handleSubmit}>

            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Button type="submit">Login</Button>
        </Form>

        <Anchor href=""
            onClick={handleRegisterClick}>Register</Anchor>

    </section>
}

