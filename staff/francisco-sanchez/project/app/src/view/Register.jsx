import { errors } from 'com'

const { SystemError } = errors

//import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'

import useContext from './useContext'

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


    return <main className="flex flex-col">
        <h2 className="">Register</h2>
        <div className="flex flex-col">
            <form flex flex-col justify-items-start onSubmit={handleSubmit}>
                <field>
                    <label htmlFor="name">Name</label>
                    <input className="border-2 rounded-lg" type="text" id="name" />
                </field>

                <field>
                    <label htmlFor="email">E-mail</label>
                    <input className="border-2 rounded-lg" type="email" id="email" />
                </field>

                <field>
                    <label htmlFor="username">Username</label>
                    <input className="border-2 rounded-lg" type="text" id="username" />
                </field>

                <field>
                    <label htmlFor="password">Password</label>
                    <input className="border-2 rounded-lg" id="password" type="password" />
                </field>

                <field>
                    <label htmlFor="password-repeat">Repeat Password</label>
                    <input className="border-2 rounded-lg" id="password-repeat" type="password" />
                </field>

                <Button type="submit">Register</Button>
            </form>

            <a href=""></a>
            <p>Do you have an account? <a href="" title="Create a new account" onClick={handleLoginClick}>Login here</a></p>
        </div>
    </main>
}