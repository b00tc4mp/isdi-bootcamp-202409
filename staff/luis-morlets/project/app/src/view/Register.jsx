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
            logic.registerPlayer(name, email, username, password, passwordRepeat)
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

    return <main className="flex flex-col items-center justify-center h-screen w-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/castillo.jpg')" }}>

        <div className="flex flex-col items-center justify-center bg-[url('/images/menusbg.png')] bg-center bg-cover h-[30rem] w-full" >
            <img src="/images/registerTitle.png" alt="register title with icon" />

            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                <label htmlFor="name" className="text-2xl self-start">Name:</label>
                <input type="text" id="name" required={true} className="border-black border" />

                <label htmlFor="email" className="text-2xl self-start">E-mail:</label>
                <input type="email" id="email" required={true} className="border-black border" />

                <label htmlFor="username" className="text-2xl self-start">Username:</label>
                <input type="username" id="username" required={true} className="border-black border" />

                <label htmlFor="password" className="text-2xl self-start">Password:</label>
                <input type="password" id="password" required={true} className="border-black border" />

                <label htmlFor="password-repeat" className="text-2xl self-start">Repeat Password:</label>
                <input type="password" id="password-repeat" required={true} className="border-black border" />

                <button type="submit">Sign Up</button>
            </form>

            <a href="" onClick={handleLoginClick}>Login here</a>
        </div>
    </main>
}