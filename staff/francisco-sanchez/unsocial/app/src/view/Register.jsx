import './Register.css'

//import registerUser from '../logic/registerUser'
//import PasswordInput from '../components/library/PasswordInput'

/*import Label from '../components/library/Label'
import Input from '../components/library/Input'
import Button from '../components/library/Button'
import Field from '../components/library/Field'
import Form from '../components/library/Form'*/

import { PasswordInput, Label, Input, Button, Field, Form } from '../components/library'
import logic from '../logic'

//Funcion register, que mostrará el formulario de registro
//export default (props) => {
export default function Register(props) {

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target //event.target hacer referencia al form 

        const {
            target: { username: { value: username },
                password: { value: password },
                name: { value: name },
                email: { value: email },
                passwordRepeat: { value: passwordRepeat } } } = event

        try {
            logic.registerUser(name, email, username, password, passwordRepeat, error => {
                if (error) {
                    alert(error.message)
                    console.error(error)
                    return
                }
                form.reset()
                props.onRegistered()
            })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()
        props.onLoginClick()
    }

    return <main className="Register">
        <div className="container">

            <h2>Register</h2>

            <Form onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="name">Name</Label>
                    <Input type="text" id="name" />
                </Field>

                <Field>
                    <Label htmlFor="email">E-mail</Label>
                    <Input type="email" id="email" />
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
                <Button type="submit" className="Button" >Register</Button>
            </Form>

            <a href="" onClick={handleLoginClick}>Login</a>
        </div>
    </main>
}