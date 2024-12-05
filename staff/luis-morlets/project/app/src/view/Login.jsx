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

    return <main className="flex flex-col items-center justify-center h-screen w-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/castillo.jpg')" }} >

        <div className="flex flex-col items-center justify-center bg-[url('/images/menusbg.png')] bg-center bg-cover h-[30rem] w-full gap-20" >
            <img src="/images/LoginTitle.png" alt="login title with icon" />

            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center text-xl">
                <div>
                    <field className="flex flex-col justify-center items-center" >
                        <label htmlFor="username" className="text-2xl self-start">Username:</label>
                        <input type="text" id="username" required={true} className="border-black border bg-[grey]" />
                    </field>

                    <field className="flex flex-col justify-center items-center">
                        <label htmlFor="password" className="text-2xl self-start">Password:</label>
                        <input type="password" id="password" required={true} className="border-black border bg-[grey]" />
                    </field>
                </div>

                <button type="submit">Sign In</button>
            </form>

            <a href="" onClick={handleRegisterClick}>Register here</a>
        </div>
    </main>
}