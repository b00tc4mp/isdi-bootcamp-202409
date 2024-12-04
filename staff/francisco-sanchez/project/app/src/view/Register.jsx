import { errors } from 'com'

const { SystemError } = errors

//import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'

import useContext from './useContext'

import { Button, Field, Input, Label, Image } from '../library'


export default function Register(props) {
    console.log('Register -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
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
                .then(() => {
                    form.reset()

                    alert(' New user was successfully registered', 'success')

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


    return <main className="flex flex-col justify-center items-center bg-color_backgroundGrey w-full h-screen">
        <h2 className="">Register</h2>
        <div className="flex flex-col">
            <form className="flex flex-col justify-items-start" onSubmit={handleSubmit}>
                <Field>
                    <Label htmlFor="name">Name</Label>
                    <Input className="border-2 rounded-lg" type="text" id="name" />
                </Field>

                <Field>
                    <Label htmlFor="email">E-mail</Label>
                    <Input className="border-2 rounded-lg" type="email" id="email" />
                </Field>

                <Field>
                    <Label htmlFor="username">Username</Label>
                    <Input className="border-2 rounded-lg" type="text" id="username" />
                </Field>

                <Field>
                    <Label htmlFor="password">Password</Label>
                    <Input className="border-2 rounded-lg" id="password" type="password" />
                </Field>

                <Field>
                    <Label htmlFor="password-repeat">Repeat Password</Label>
                    <Input className="border-2 rounded-lg" id="password-repeat" type="password" />
                </Field>

                <Button type="submit">Register</Button>
            </form>

            <a href=""></a>
            <p>Do you have an account? <a href="" title="Create a new account" onClick={handleLoginClick}>Login here</a></p>
        </div>
    </main>
}