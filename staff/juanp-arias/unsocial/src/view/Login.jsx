import './Login.css'
import { PasswordInput, Input, Button, Form, Label } from '../components/library'
import logic from '../logic'


//TODO make styles of all views
function Login(props) {
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
            <input type="text" id="username" placeholder="USERNAME"></input>

            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" />

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
export default Login