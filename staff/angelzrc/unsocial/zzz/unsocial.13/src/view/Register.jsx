import registerUser from '../logic/registerUser'
import PasswordInput from '../components/library/PasswordInput'

function Register(props) {
    console.log('Register -> render')

    return <section>
        <h2>Register</h2>

        <Form onSubmit={event => {
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
                registerUser(name, email, username, password, passwordRepeat)

                form.reset()

                props.onRegistered()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }}>
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" style={{ width: '100%', boxSizing: 'border-box' }} />

            <Label htmlFor="email">E-mail</Label>
            <Input type="email" id="email" style={{ width: '100%', boxSizing: 'border-box' }} />

            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />

            <Label htmlFor="password">Password</Label>
            <PasswordInput id="password" />

            <Label htmlFor="password-repeat">Repeat Password</Label>
            <PasswordInput id="password-repeat" />

            <Button type="submit">Register</Button>
        </Form>

        <a href="" onClick={event => {
            event.preventDefault()

            props.onLoginClick()
        }}>Login</a>
    </section>
}

export default Register