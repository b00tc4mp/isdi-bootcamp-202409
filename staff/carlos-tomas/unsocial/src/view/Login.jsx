import './Login.css'

import PasswordInput from '../components/library/PasswordInput'
import authenticateUser from '../logic/authenticateUser'
import Label from '../components/library/Label'
import Form from '../components/library/Form'
import Input from '../components/library/Input'
import Field from '../components/library/Field'
import Button from '../components/library/Button'


function Login(props) {
    console.log('Login -> render')

    return <section className="Login">
        <h2>Login</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                sessionStorage.loggedInUserId = authenticateUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {
                //passwordInput.setValue('')

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

        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</a>
    </section>
}


export default Login