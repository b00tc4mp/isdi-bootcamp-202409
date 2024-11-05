import { PasswordInput, Input, Button, Form, Field, Label, Anchor } from '../components/library'

import logic from '../logic'

import './Login.css'

export default props => {
    console.log("Login -> render")

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password, error => {

                if (error) {
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

        props.registerInquire()

    }

    return <section className='Login'>
        <h2>Login</h2>

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

