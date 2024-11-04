import './Register.css'

import registerUser from '../logic/registerUser'
import PasswordInput from '../components/library/PasswordInput'
import Input from '../components/library/Input'
import Button from '../components/library/Button'
import Form from '../components/library/Form'
import Field from '../components/library/Field'
import Label from '../components/library/Label'

function Register() {
    console.log('Register -> render')

    return <section>
        <h2>Register</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const {target: form } = event

            const { 
                name: {value: name},
                email: {value: email},
                username: { value: username},  
                password: {value: password}, 
                ['passowrd-repeat']: { value: passowrdRepeat }
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
            <Input type="text" id="name" placeholder="i.e. Tom" />
        </Field>

        <Field>
            <Label htmlFor="email">E-mail</Label>
            <Input type="email" id="email" placeholder="i.e. unsocial@gmail.com" />
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
            <Label htmlFor="password-repeat">Repeat Password</Label>
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