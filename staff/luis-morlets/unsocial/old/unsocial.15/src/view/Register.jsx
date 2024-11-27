import './Register.css'

import logic from '../logic'

import PasswordInput from '../components/library/PasswordInput'
import Form from '../components/library/Form'
import Label from '../components/library/Label'
import Input from '../components/library/Input'
import Button from '../components/library/Button'
import Paragraph from '../components/library/Paragraph'
import Field from '../components/library/Field'

export default (props) => {

    console.log('Register -> render')
    return <main className="Register">
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
                logic.registerUser(name, email, username, password, passwordRepeat)

                form.reset()

                props.onRegister()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <Field>
                <Label htmlFor="name">Name:</Label>
                <Input type="text" id="name" required={true} />
            </Field>

            <Field>
                <Label htmlFor="email">E-mail:</Label>
                <Input type="email" id="email" required={true} />
            </Field>

            <Field>
                <Label htmlFor="username">Username:</Label>
                <Input type="text" id="username" required={true} />
            </Field>

            <Field>
                <Label htmlFor="password">Password:</Label>
                <PasswordInput id="password" />
            </Field>

            <Field>
                <Label htmlFor="password-repeat">Repeat Password:</Label>
                <PasswordInput id="password-repeat" />
            </Field>

            <Button type="submit" className="">Register</Button>
        </Form>

        <Paragraph className="">Already have an account? <a href="" onClick={event => {
            event.preventDefault()

            props.onLoginLink()
        }}>Login</a></Paragraph>
    </main>
}