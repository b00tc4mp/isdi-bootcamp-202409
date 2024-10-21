import authenticateUser from '../logic/authenticateUser'
import PasswordInput from '../components/library/PasswordInput'

function Login(props) {
  console.log('Login -> render')

  return <section>
    <h2>Login</h2>

    <form onSubmit={event => {
      event.preventDefault()

      const { target: form } = event

      const { username: { value: username }, password: { value: password } } = form

      try {
        sessionStorage.loggedInUserId = authenticateUser(username, password)

        form.reset()

        props.onLoggedIn()
      } catch (error) {
        // passwordInput.setValue('')

        alert(error.message)

        console.error(error)
      }
    }}>
      <label htmlFor="username">Username</label>
      <input type="text" id="username" style={{ width: 'auto', boxSizing: 'border-box' }} />

      <label htmlFor="password">Password</label>
      <PasswordInput id="password" />

      <button type="submit">Login</button>
    </form>

    <a href="" onClick={event => {
      event.preventDefault()

      props.onRegisterLink()
    }}>Register</a>
  </section>
}

export default Login