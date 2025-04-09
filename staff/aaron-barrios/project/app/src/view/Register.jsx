import { errors } from 'com'

const { SystemError } = errors

import { Field } from './library'

import logic from '../logic'

export default function Register(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            nickname: { value: nickname },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat }
        } = form

        try {
            logic.registerUser(name, nickname, password, passwordRepeat)
                .then(() => {
                    form.reset()

                    props.onRegistered()
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

    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    return <main>
        <h2>Register</h2>

        <form onSubmit={handleSubmit}>
            <Field>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" />
            </Field>

            <Field>
                <label htmlFor="nickname">Nickname</label>
                <input type="text" id="nickname" />
            </Field>

            <Field>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" />
            </Field>

            <Field>
                <label htmlFor="password-repeat">Repeat Password</label>
                <input type="password" id="password-repeat" />
            </Field>

            <button type="submit">Register</button>
        </form>

        <a href="" onClick={handleLoginClick}>Login</a>
    </main>
}