
import PasswordInput from '../components/library/PasswordInput'
import Button from '../components/library/Button'
import Form from '../components/library/Form'
import Label from '../components/library/Label'
import Input from '../components/library/Input'
import Field from '../components/library/Field'
import Anchor from '../components/library/Anchor'

import logic from '../logic'

function Register(props) {
    return <section>
        <h2>Register</h2>

        <Form onSubmit={event => {
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

        <Anchor href=""
            onClick={event => {

                event.preventDefault()

                props.logBack()
            }}
        >Login</Anchor>
    </section >

}

export default Register