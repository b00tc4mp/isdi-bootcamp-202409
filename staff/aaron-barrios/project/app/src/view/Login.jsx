import { Field } from './library'

import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

export default function Login(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const { target: { nickname: { value: nickname }, password: { value: password } } } = event

        try {
            logic.loginUser(nickname, password)
                .then(() => {
                    event.target.reset()

                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Casi, crack')
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

    return <main>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
            <Field>
                <label htmlFor="nickname">Nickname</label>
                <input type="text" id="nickname" />
            </Field>

            <Field>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
            </Field>

            <button type="submit">Login</button>
        </form>

        <a href="" onClick={handleRegisterClick}>Register</a>
    </main>
}