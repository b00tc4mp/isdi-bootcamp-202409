


import { PasswordInput, Input, Button, Form, Field, Label } from './library'
import { Alert } from './components'
import logic from '../logic'
import { errors } from 'com'
import useContext from './useContext'
import logoProject from '../assets/logoProject.png'

const { SystemError } = errors

export default function Login(props) {
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()
        const { target: { name: { value: name }, password: { value: password } } } = event
        try {
            logic.loginUser(name, password)
                .then(() => {
                    event.target.reset()
                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        Alert('Lo sentimos, intentelo de nuevo mas tarde.')
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

    return <main className="flex items-center justify-center container mx-auto h-screen">
        <div className="p-6 rounded-lg">
            <img src={logoProject} alt="profile" className="container mx-auto w-14 h-14" />

            <h1 className="flex items-center justify-center">Costelier</h1>
            <div className="container mx-auto bg-gray-200 rounded-lg p-6 mt-8">
                <div className="bg-gray-100 rounded-lg p-6">
                    <Form onSubmit={handleSubmit}>
                        <Field>
                            <Label htmlFor="name">name</Label>
                            <Input type="text" id="name" />
                        </Field>

                        <Field>
                            <Label htmlFor="password">Password</Label>
                            <PasswordInput id="password" />
                        </Field>
                        <div className='text-center mt-4'>
                            <Button type="submit" className="mt-12">Login</Button>
                        </div>
                    </Form>
                </div>
                <div className="text-center mt-4">
                    <a href="" className="text-blue-500 hover:underline" onClick={handleRegisterClick}>
                        Register
                    </a>
                </div>
            </div>
        </div>
    </main>

}