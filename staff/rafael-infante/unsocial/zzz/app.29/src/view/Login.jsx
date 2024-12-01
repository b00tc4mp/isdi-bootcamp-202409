import "./Login.css"
import logic from "../logic/"
import { PasswordInput, Input, Button, Label, Form } from "../components/biblio"

function Login(props) {
  console.log('Login -> Render')

  const handleSubmit = event => {
    event.preventDefault()

    const { target: { username: { value: username }, password: { value: password } } } = event

    try {

      logic.loginUser(username, password, error => {

        if (error) {
          alert(error.message)
          console.error(error)
          return
        }
        event.target.reset()
        props.onLoggedIn()
      })

    } catch (error) {
      alert(error.message)
      console.error(error)
    }
  }

  const handleRegisterClick = event => {
    event.preventDefault()
    props.onAnchorRegister()
  }

  return (
    <main className="Login" >
      <p>Welcome!</p>
      <h2>Sign in to unSocial</h2>
      <h4>Write username and password to access</h4>

      <Form
        onSubmit={handleSubmit}>

        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" placeholder="Enter your username" required />

        <Label htmlFor="password">Password</Label>
        <PasswordInput id="password" />

        <Button id="btn-login" type="submit">Login</Button>

      </Form>
      <p>Don't have an account? <a onClick={handleRegisterClick}>Register</a></p>
    </main>
  )
}

export default Login