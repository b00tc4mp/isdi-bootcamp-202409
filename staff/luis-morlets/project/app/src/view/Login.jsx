import useContext from './useContext'

export default function Login(props) {
    console.log('Login -> render')

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()


    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="flex flex-col justify-center">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" required={true} className="border-black border" />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" required={true} className="border-black border" />

            <button type="submit">Sign In</button>
        </form>

        <a href="" onClick={handleRegisterClick}>Register here</a>
    </main>
}