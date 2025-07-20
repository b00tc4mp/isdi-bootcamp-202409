import { errors } from 'com'
const { SystemError } = errors

import logic from '../logic'
import useContext from './useContext'

import { Button, Field, Input, Label, Image } from '../library'

export default function Register(props) {
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
            logic.registerUser(name, email, username, password, passwordRepeat)
                .then(() => {
                    form.reset()
                    alert('New user was successfully registered', 'success')
                    props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError) alert('Sorry, try again later.')
                    else alert(error.message)
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

    return (
        <main className="flex flex-col items-center justify-center bg-color_backgroundGrey w-full flex-grow">
            {/* Título principal, igual que en Login */}
            <h1 className="text-3xl font-bold text-color_primary mb-4">Hourify</h1>

            {/* Contenedor central igual que en Login */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                <div className="flex flex-col items-center">

                    {/* Encabezado de registro con estilo similar al de Login */}
                    <h2 className="text-2xl font-bold text-color_darkBlue mb-4">Register</h2>

                    {/* Formulario, con gap y ancho completo como en Login */}
                    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>

                        <Field>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Your name"
                                required
                                className="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary"
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Your email"
                                required
                                className="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary"
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                placeholder="Your username"
                                required
                                className="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary"
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Your password"
                                required
                                className="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary"
                            />
                        </Field>

                        <Field>
                            <Label htmlFor="password-repeat">Repeat Password</Label>
                            <Input
                                id="password-repeat"
                                type="password"
                                placeholder="Repeat your password"
                                required
                                className="w-full px-1 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary"
                            />
                        </Field>

                        {/* Checkbox para la política de privacidad */}
                        <field className="flex items-center justify-start gap-2 pl-2">
                            <input
                                id="privacy"
                                type="checkbox"
                                required
                                className="h-4 w-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-color_primary"
                            />
                            <label htmlFor="privacy" className="text-gray-700">
                                I accept the privacy policy
                            </label>
                        </field>

                        {/* Botón para registrar */}
                        <Button type="submit" className="bg-color_primary text-white px-4 py-2 rounded-md hover:bg-color_primaryHover transition">
                            Register
                        </Button>
                        <p className="text-xs text-gray-500">
                            By creating an account, you agree to our Terms of Service and acknowledge that you
                            have read and understand our Privacy Policy.
                        </p>
                    </form>

                    {/* Enlace para ir a Login, mismo estilo que "Don't have an account yet?" en Login */}
                    <p className="mt-4 text-gray-600">
                        Do you have an account?{" "}
                        <a href="" title="Login with your existing account" onClick={handleLoginClick} className="text-color_primary hover:underline">Login here</a>
                    </p>
                </div>
            </div>
        </main>
    )
}