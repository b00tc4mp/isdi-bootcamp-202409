import { errors } from 'com'

const { SystemError } = errors

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

                    alert('User successfully registered', 'success')

                    props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later')
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

    return <main className="flex flex-col justify-center items-center">
        <h2>Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" required={true} className="border-black border" />

            <label htmlFor="email">E-mail:</label>
            <input type="email" id="email" required={true} className="border-black border" />

            <label htmlFor="username">Username:</label>
            <input type="username" id="username" required={true} className="border-black border" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" required={true} className="border-black border" />

            <label htmlFor="password-repeat">Repeat Password:</label>
            <input type="password" id="password-repeat" required={true} className="border-black border" />

            <button type="submit">Sign Up</button>
        </form>

        <a href="" onClick={handleLoginClick}>Login here</a>
    </main>
}