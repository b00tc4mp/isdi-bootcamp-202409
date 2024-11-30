import errors from '../../../com/errors.js' //index.js //import { errors } from 'com'

const { SystemError } = errors

//create and import custom components for imput buttons etc....

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
                <input type='text' id='name' />
            </div>

            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' />
            </div>

            <div>
                <label htmlFor='username'>Nombre de Usuario</label>
                <input type='text' id='username' />
            </div>

            <div>
                <label htmlFor='password'>Contraseña</label>
                <input type='password' />
            </div>

            <div>
                <label htmlFor='passowrd2'>Confirmar contraseña</label>
                <input type='password' />
            </div>

            <button type='submit'>Regístrarte</button>
        </form>

        <a href='' onClick={handleLoginClick}>Iniciar sesión</a>
    </main>
}

// dark light mode "flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]"
