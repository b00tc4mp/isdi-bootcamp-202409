import './Login.css'
import { PasswordInput, Input, Button, Form, Label } from './library'
import logic from '../logic'
import { errors } from 'com'

const { SystemError } = errors

export default function Login(props) {

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset()

                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
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

    return <main className='Login p-8 rounded-xl'>
        <h2 className='text-3xl'>Login</h2>

        <Form onSubmit={handleSubmit}>
            <Label htmlfor="username">Username</Label>
            <Input type="text" id="username" placeholder="username"></Input>

            <Label htmlfor="password">Password</Label>
            <PasswordInput id="password" placeholder="password" />

            <Button type="submit"><strong>LOGIN</strong></Button>
        </Form>

        <h4>Don't have an account?</h4>
        <a href="" onClick={handleRegisterClick}>Register</a>

    </main>
}
