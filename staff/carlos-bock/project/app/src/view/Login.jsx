//create passwordinput, input, button, form, field, label in library
import Button from './library/Button.jsx'
//import loginUser from '../logic/user/loginUser.js'
//import registerUser from '../logic/user/registerUser.js'

import logic from '../logic/index.js'

import errors from '../../../com/errors.js' // also index.js //import { errors } from 'com' // check import

const { SystemError } = errors

import useContext from './useContext.js'

export default function Login(props) {
    console.log('Login -> render')

    //const { alert } = useContext() // add latter for custom alert

    const handleSubmit = event => {
        event.preventDefault()

        const { target: {
            username: { value: username },
            password: { value: password } } }
            = event

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset()

                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('El servicio no está disponible en estos momentos')
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
    //////////////////////replace form and divs with react components
    return <main>
        <h2>iniciar sesión</h2>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='username'>Nombre de usuario</label>
                <input type='text' id='username'></input>
            </div>

            <div>
                <label htmlFor='password'>Contraseña</label>
                <input type='password' id='password'></input>
            </div>

            <Button type='submit'>iniciar sesión</Button>
        </form>
        <a href='' onClick={handleRegisterClick}>Regístrate</a>
    </main>
}



