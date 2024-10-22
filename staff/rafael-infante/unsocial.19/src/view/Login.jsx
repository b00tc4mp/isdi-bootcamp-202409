import authenticateUser from "../logic/authenticateUser"
import PasswordInput from "../components/biblio/PasswordInput"

function Login(props) {
  console.log('Login -> Render')
  return (
    <section className="section-container" >
      <p>Welcome!</p>
      <h2>Sign in to unSocial</h2>
      <h4>Write username and password to access</h4>

      <form className="form-container"
        onSubmit={event => {
          event.preventDefault()

          const { target: { username: { value: username }, password: { value: password } } } = event

          try {

            sessionStorage.loggedUserId = authenticateUser(username, password)
            event.target.reset()
            props.onLoggedIn()

          } catch (error) {
            alert(error.message)
            console.error(error)
          }
        }}>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder="Enter your username" required />
        <label htmlFor="password">Password</label>
        <PasswordInput id="password" />
        <button id="btn-login" type="submit">Login</button>
      </form>
      <p>Don't have an account? <a onClick={event => {
        event.preventDefault()
        props.onAnchorRegister()
      }}>Register</a></p>
    </section>
  )
}

export default Login