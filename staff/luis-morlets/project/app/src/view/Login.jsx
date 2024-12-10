import useContext from './useContext'
import logic from '../logic'

import { errors } from 'com'
import { Button, Field, Form, Input, Label } from './components/library'

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

        <div className="flex flex-col items-center justify-center bg-[url('/images/menusbg.png')] bg-center bg-cover h-[35rem] w-[35%] gap-[4.5rem] border-4 border-black rounded-xl p-8" >
            <img src="/images/LoginTitle.png" alt="login title with icon" />

            <Form onSubmit={handleSubmit} className="flex flex-col justify-center items-center text-xl">
                <div>
                    <Field className="flex flex-col justify-center items-center" >
                        <Label htmlFor="username" className="text-2xl self-start">Username:</Label>
                        <Input type="text" id="username" required={true} className="border-black border bg-[grey]" />
                    </Field>

                    <Field className="flex flex-col justify-center items-center">
                        <Label htmlFor="password" className="text-2xl self-start">Password:</Label>
                        <Input type="password" id="password" required={true} className="border-black border bg-[grey]" />
                    </Field>
                </div>

                <Button type="submit">Sign In</Button>
            </Form>

            <a href="" onClick={handleRegisterClick}>Register here</a>
        </div>
    </main>
}