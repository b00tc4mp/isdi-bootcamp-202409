import registerUser from "../logic/registerUser"
import PasswordInput from "../components/biblio/PasswordInput"

function Register(props) {
  return (
    <section className="section-container">
      <h2>Register to unSocial</h2>
      <form className="form-container"
        onSubmit={event => {
          event.preventDefault()

          const { target: form } = event
          const {
            name: { value: name },
            email: { value: email },
            username: { value: username },
            password: { value: password },
            confirmPassword: { value: confirmPassword } } = form

          try {
            registerUser(name, email, username, password, confirmPassword)
            form.reset()
            props.onRegistered()
          } catch (error) {
            alert(error.message)
            console.error(error)
          }
        }}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" placeholder="Enter your name" required />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder="Enter your email" required />
        <label htmlFor="username">User Name</label>
        <input type="text" id="username" placeholder="Enter your username" required />
        <label htmlFor="password">Password</label>
        <PasswordInput id="password" />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <PasswordInput id="confirmPassword" />
        <button id="btn-register" type="submit">Register</button>
      </form>
      <p>Already have an account? <a onClick={event => {
        event.preventDefault()
        props.onAnchorLogin()
      }
      }>Login</a></p>
    </section>
  )
}

export default Register