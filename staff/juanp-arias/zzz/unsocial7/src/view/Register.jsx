import registerUser from '../logic/registerLogic'
import Form from '../components/function/Form'
import Input from '../components/function/Input'
import Button from '../components/function/Button'
import PasswordInput from '../components/library/PasswordInput'

function Register(props) {
    return <section className="section-container" id="register">
        <h2>REGISTER</h2>

        <Form onSubmit={event => {
            event.preventDefault()

            const { target: { name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                ['password-repeat']: { value: repeatpassword }
            } } = event

            try {
                registerUser(name, email, username, password, repeatpassword)
                event.target.reset()

                props.onRegistered()
            } catch (error) {

                alert(error.message)

                console.error(error)
            }
        }}>
            <label htmlFor="name">Name</label>
            <Input type="text" id="name" />

            <label htmlFor="email">E-mail</label>
            <Input type="email" id="email" />

            <label htmlFor="username">Username</label>
            <Input type="text" id="username" />

            <label htmlFor="password">Password</label>
            <PasswordInput id="password" />

            <label htmlFor="password-repeat">Repeat Password</label>
            <PasswordInput id="password-repeat" />

            <Button type="submit">Register</Button>
        </Form>
        <a href="" onClick={
            event => {
                event.preventDefault()

                props.onLoginClick()
            }}>Login</a>
    </section>
}
export default Register