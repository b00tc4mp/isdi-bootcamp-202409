import registerUser from '../logic/registerUser'

function Register(props) {
    return <section>
        <h2>Register</h2>

        <form onSubmit={event => {
            event.preventDefault()

            const { target: form } = event

            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                passwordRepeat: { value: passwordRepeat }
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
            <label htmlFor="name">Name</label>
            <input type="text" id="name"></input>

            <label htmlFor="email">Email</label>
            <input type="email" id="email"></input>

            <label htmlFor="username">Username</label>
            <input type="text" id="username"></input>

            <label htmlFor="password">Password</label>
            <input type="password" id="password"></input>

            <label htmlFor="passwordRepeat">Confirm password</label>
            <input type="password" id="passwordRepeat"></input>

            <button type="submit">Register</button>
        </form>
        <a href="" onClick={event => {
            event.preventDefault()

            props.onLoginClick()
        }}>Login</a>
    </section>
}

export default Register