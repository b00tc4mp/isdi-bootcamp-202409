import authenticateUser from '../logic/userLogic'
import Input from '../components/function/Input'
import Form from '../components/function/Form'
import Button from '../components/function/Button'
import PasswordInput from '../components/library/PasswordInput'

//TODO make styles of all views
function Login(props) {
    return <section className="section-container">
        <h2>LOGIN</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: { username: { value: username }, password: { value: password } } } = event

            try {
                sessionStorage.loggedInUserId = authenticateUser(username, password)

                event.target.reset()

                props.onLoggedIn()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="username">Username</label>
            <Input type="text" id="username"></Input>

            <label htmlFor="password">Password</label>
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

    </section>
}
export default Login