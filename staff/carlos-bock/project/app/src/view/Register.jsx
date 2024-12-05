import errors from '../../../com/errors.js' //index.js //import { errors } from 'com'

const { SystemError } = errors

import Button from './library/Button.jsx'; import Form from './library/Form.jsx'
import Field from './library/Field.jsx'; import Label from './library/Label.jsx';
import Input from './library/Input.jsx'; import PasswordInput from './library/PasswordInput.jsx'; //import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic/index.js'

//import useContext from './useContext'

export default function Register(props) {
    console.log('Register -> render')

    // add custom alert using useContext

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            username: { value: username },
            password: { value: password },
            password2: { value: password2 }
        } = form

        try {
            logic.registerUser(name, email, username, password, password2)
                .then(() => {
                    form.reset()

                    alert('Usuario registrado con éxito')

                    props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Lo sentimos, vuelva a intentar más tarde')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error
        }
    }


    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    return <main>
        <h2>Regístarte</h2>

        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name'>Nombre</label>
                <input type='text' id='name' name='name' />
            </div>

            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' />
            </div>

            <div>
                <label htmlFor='username'>Nombre de Usuario</label>
                <input type='text' id='username' name='username' />
            </div>

            <div>
                <label htmlFor='password'>Contraseña</label>
                <input type='password' id='password' />
            </div>

            <div>
                <label htmlFor='password2'>Confirmar contraseña</label>
                <input type='password' id='password2' />
            </div>

            <button type='submit'>Regístrarte</button>
        </form>

        <a href='' onClick={handleLoginClick}>Iniciar sesión</a>
    </main>
}

// dark light mode "flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]"