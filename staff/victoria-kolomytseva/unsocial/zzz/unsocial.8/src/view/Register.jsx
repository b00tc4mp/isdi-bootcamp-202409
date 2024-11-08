import registerUser from '../logic/registerUser'
import PasswordInput from '../components/library/PasswordInput'
import Input from '../components/library/Input'
import Button from '../components/library/Button'
import Form from '../components/library/Form'
import Field from '../components/library/Field'
import Label from '../components/library/Label'


function Register(props) {
    console.log('Register -> render')

    return <section className="Register">
        <h2>Register</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                ['password-repeat']: { value: passwordRepeat }
            } = form

            try {
                registerUser(name, email, username, password, passwordRepeat)

                form.reset()

                props.onRegistered()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" />
            </Field>

            <Field>
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" />
            </Field>

            <Field>
                <label htmlFor="username">Username</label>
                <input type="text" />
            </Field>

            <Field>
                <label htmlFor="password">Password</label>
                <PasswordInput id="password" />
            </Field>

            <Field>
                <label htmlFor="password-repeat">Repeat Password</label>
                <PasswordInput id="password-repeat" />
            </Field>

            <Button type="submit">Register</Button>
        </Form>

        <a href="" onClick={event => {
            event.preventDefault()

            props.onLoginClick()
        }}>Login</a>
    </section>
}

export default Register