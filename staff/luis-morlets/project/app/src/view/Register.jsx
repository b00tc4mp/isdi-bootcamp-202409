import { errors } from 'com'

import logic from '../logic'
import useContext from './useContext'

import { Button, Field, Form, Input, Label } from './components/library'

const { SystemError } = errors

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

        <div className="flex flex-col items-center justify-center bg-[url('/images/menusbg.png')] bg-center bg-cover h-[40rem] w-[35%] border-4 border-black rounded-xl p-12 gap-4" >
            <img src="/images/registerTitle.png" alt="register title with icon" />

            <Form onSubmit={handleSubmit} className="flex flex-col justify-center items-center">
                <Field>
                    <Label htmlFor="name">Name:</Label>
                    <Input type="text" id="name" required={true} className="border-black border" />
                </ Field>

                <Field>
                    <Label htmlFor="email">E-mail:</Label>
                    <Input type="email" id="email" required={true} className="border-black border" />
                </ Field>

                <Field>
                    <Label htmlFor="username">Username:</Label>
                    <Input type="username" id="username" required={true} className="border-black border" />
                </ Field>

                <Field>
                    <Label htmlFor="password">Password:</Label>
                    <Input type="password" id="password" required={true} className="border-black border" />
                </ Field>

                <Field>
                    <Label htmlFor="password-repeat" >Repeat Password:</Label>
                    <Input type="password" id="password-repeat" required={true} className="border-black border" />
                </ Field>

                <Button type="submit" className="bg-red-700 text-white text-lg rounded-md border-2 border-black shadow-lg transform transition-transform hover:scale-105 hover:bg-red-800 active:bg-red-600 w-[25%] self-center ">Sign Up</Button>
            </Form>

            <p>Already have an account? <a href="" onClick={handleLoginClick}>Login here</a></p>
        </div>
    </main>
}