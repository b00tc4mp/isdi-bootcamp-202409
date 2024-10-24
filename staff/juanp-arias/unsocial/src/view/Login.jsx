import './Login.css'
import { PasswordInput, Input, Button, Form, Label } from '../components/library'
import logic from '../logic'


export default (props) => {
    return <main className='Login'>
        <h2>LOGIN</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                logic.loginUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" placeholder="username"></Input>

            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" placeholder="password" />

            <Button type="submit">Login</Button>
        </Form>

        <h4>Don't have an account?</h4>
        <a href="" onClick={
            event => {
                event.preventDefault()
                props.onRegisterClick()
            }
        }>Register</a>

    </main>
}
