import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors

import useContex from './useContext'

export default function Login(props) {
    console.log('Login -> render')

    const { alert } = useContex()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset() //Clean the login form
                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, there was a problem, try it again later')
                    else
                        alert(error.message)
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


    return <main className="flex flex-col">
        <h2>Login</h2>

        <form className="flex flex-col justify-items-start" onSubmit={handleSubmit}>
            <field>
                <label htmlFor="username">Username</label>
                <input className="border-2 rounded-lg" type="text" id="username" />
            </field>

            <field>
                <label htmlFor="password">Password</label>
                <input className="border-2 rounded-lg" id="password" type="password" />
            </field>

            <button type="submit">Login</button>
        </form>

        <p>Don't have an account yet? <a href="" title="Create a new account" onClick={handleRegisterClick}>Create account</a></p>
    </main>

}