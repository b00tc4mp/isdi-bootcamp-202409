


import { errors } from 'com'
const { SystemError } = errors
import { PasswordInput, Input, Button, Form, Field, Label } from './library'
import { Alert, Confirm } from '../view/components'
import logic from '../logic'
import useContext from './useContext'

export default function Register(props) {
    console.log('Register -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            role: { value: role },
            name: { value: name },
            email: { value: email },
            license: { value: license },
            password: { value: password },
            repeatPassword: { value: repeatPassword }
        } = form

        try {
            debugger
            logic.registerUser(role, name, email, license, password, repeatPassword)
                .then(() => {
                    form.reset()

                    Confirm('Usuario registrado')

                    props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        Alert('Lo sentimos, intentelo de nuevo mas tarde')
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

    return <main className="flex items-center justify-center container mx-auto h-screen mt-28">
        <div className='justify-container mx-auto bg-gray-200 rounded-lg p-6 mt-8  rounded-lg'>
            <h1 className='flex items-center justify-center text-xl text-semibolt'>Register</h1>

            <div className='flex justify-center container mx-auto bg-gray-100 rounded-lg p-6 mt-4'>

                <Form onSubmit={handleSubmit}>
                    <Field>
                        <Label htmlFor="role">Rol</Label>
                        <select id="role" name="role" className="w-full border-2 border-[var(--color)] rounded-lg p-1">
                            <option value="restaurant">Restaurante</option>
                            <option value="employee">Empleado</option>
                        </select>
                    </Field>

                    <Field>
                        <Label htmlFor="name">Nombre</Label>
                        <Input type="text" id="name" />
                    </Field>

                    <Field>
                        <Label htmlFor="email">E-mail</Label>
                        <Input type="email" id="email" />
                    </Field>

                    <Field>
                        <Label htmlFor="license">DNI/NIE</Label>
                        <Input type="text" id="license" />
                    </Field>

                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput id="password" />
                    </Field>

                    <Field>
                        <Label htmlFor="repeatPassword">Repeat Password</Label>
                        <PasswordInput id="repeatPassword" />
                    </Field>

                    <div className='text-center mt-4'><Button type="submit">Register</Button></div>
                </Form>
            </div>
            <a href="" className='flex items-center justify-center mt-4' onClick={handleLoginClick}>Login</a>
        </div>
    </main>
}