import errors from '../../../com/errors.js' //index.js //import { errors } from 'com'

const { SystemError } = errors

import { PasswordInput, Input, Button, Form, Field, Label } from './library/index.js'

import logic from '../logic/index.js'

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
            password2: { value: password2 },

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

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor='name'>Nombre</Label>
                <Input type='text' id='name' name='name' required />
            </Field>

            <Field>
                <Label htmlFor='email'>Email</Label>
                <Input type='email' id='email' name='email' required />
            </Field>

            <Field>
                <Label htmlFor='username'>Nombre de Usuario</Label>
                <Input type='text' id='username' name='username' required />
            </Field>

            <Field>
                <Label htmlFor='password'>Contraseña</Label>
                <PasswordInput type='password' id='password' required />
            </Field>

            <Field>
                <Label htmlFor='password2'>Confirmar contraseña</Label>
                <PasswordInput type='password' id='password2' required />
            </Field>

            <Button type='submit'>Regístrarte</Button>
        </Form>

        <a href='' onClick={handleLoginClick}
            className='ml-4 mt-10 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark'
        >Iniciar sesión</a>
    </main>
}

// dark light mode "flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]"
