import "./Login.css"
import loginUser from "../logic/loginUser"
import PasswordInput from "../components/biblio/PasswordInput"
import Input from "../components/biblio/Input"
import Label from "../components/biblio/Label"
import Button from "../components/biblio/Button"
import Form from "../components/biblio/Form"

function Login(props) {
  console.log('Login -> Render')
  return (
    <main className="Login" >
      <p>Welcome!</p>
      <h2>Sign in to unSocial</h2>
      <h4>Write username and password to access</h4>

      <Form
        onSubmit={event => {
          event.preventDefault()

          const { target: { username: { value: username }, password: { value: password } } } = event

          try {

            loginUser(username, password)
            event.target.reset()
            props.onLoggedIn()

          } catch (error) {
            alert(error.message)
            console.error(error)
          }
        }}>

        <Label htmlFor="username">Username</Label>
        <Input type="text" id="username" placeholder="Enter your username" required />

        <Label htmlFor="password">Password</Label>
        <PasswordInput id="password" />

        <Button id="btn-login" type="submit">Login</Button>

      </Form>
      <p>Don't have an account? <a onClick={event => {
        event.preventDefault()
        props.onAnchorRegister()
      }}>Register</a></p>
    </main>
  )
}

export default Login