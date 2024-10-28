import './Login.css'

import authenticateUser from '../logic/authenticateUser'
import PasswordInput from '../components/library/PasswordInput'
import Input from '../components/library/Input'
import Button from '../components/library/Button'
import Form from '../components/library/Form'
import Field from '../components/library/Field'
import Label from '../components/library/Label'

function Login(props) {
    console.log('Login -> render')

    return <section className="Login">
        <h2>Login</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: {username: {value: username}, password: { value: password } } } = event

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
                <Input type="text" id="username"/>
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