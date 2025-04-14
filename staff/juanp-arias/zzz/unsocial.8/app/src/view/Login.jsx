import './Login.css'
import { PasswordInput, Input, Button, Form, Label } from '../components/library'
import logic from '../logic'


export default function Login(props) {

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    alert(error.message)
                    console.error(error)

                    return
                }
                event.target.reset()

                props.onLoggedIn()
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

    return <main className='Login'>
        <h2>Login</h2>

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
