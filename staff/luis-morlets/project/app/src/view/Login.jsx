import useContext from './useContext'
import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

export default function Login(props) {
    console.log('Login -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            username: { value: username },
            password: { value: password }
        } = form

        try {
            logic.loginPlayer(username, password)
                .then(() => {
                    form.reset()

                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="flex flex-col justify-center items-center">
        <h2>Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" required={true} className="border-black border" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" required={true} className="border-black border" />

            <button type="submit">Sign In</button>
        </form>

        <a href="" onClick={handleRegisterClick}>Register here</a>
    </main>
}