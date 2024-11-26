import { errors } from 'com'

import './Register.css'

import { PasswordInput, Label, Input, Button, Field, Form } from '../components/library'
import logic from '../logic'

import useContext from './useContext'

const { SystemError } = errors

//Funcion register, que mostrará el formulario de registro
//export default (props) => {
export default function Register(props) {
    console.log('Register -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        //event.target hacer referencia al form 
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
                .then(() => {
                    form.reset()

                    alert('User registred sucessfully', 'success')

                    props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)

                    console.error(error)
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
    //flex items-center justify-center min-h-screen bg-gray-100
    return <main className="Register flex items-center justify-center min-h-screen">
        <div className="container bg-blue-900 p-8 rounded-md">

            <h2 className="text-3xl">Register</h2>

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
                    <Label htmlFor="password-repeat">Repeat Password</Label>
                    <PasswordInput id="password-repeat" />
                </Field>
                <Button type="submit" className="Button" >Register</Button>
            </Form>

            <a href="" onClick={handleLoginClick}>Login</a>
        </div>
    </main>
}