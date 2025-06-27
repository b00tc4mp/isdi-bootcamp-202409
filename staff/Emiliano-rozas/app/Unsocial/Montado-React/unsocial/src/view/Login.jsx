
import PasswordInput from '../components/library/PasswordInput'
import Button from '../components/library/Button'
import Form from '../components/library/Form'
import Label from '../components/library/Label'
import Input from '../components/library/Input'
import Field from '../components/library/Field'
import Anchor from '../components/library/Anchor'

import logic from '../logic'

function Login(props) {
    console.log("Login -> render")

    return <section>
        <h2>Login</h2>

        <Form onSubmit={event => {
            event.preventDefault()
            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                logic.loginUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>

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
            onClick={event => {
                event.preventDefault()

                props.registerInquire()

            }}>Register</Anchor>

    </section>
}

export default Login