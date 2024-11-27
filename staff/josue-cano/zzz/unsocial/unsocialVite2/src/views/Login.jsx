import PasswordInput from "../components/library/PasswordInput"
import authenticateUser from "../components/logic/authenticateUser"
import Form from "../components/library/Form"
import Button from "../components/library/Button"



export default function Login(props){

    console.log('Login -> render')

    return <section>
      
       
        <Form onSubmit={event => {
            event.preventDefault()
            //target recoge todo el formulario
            const { target: { username: { value: username }, password: { value: password } } } = event
            // const usuario = event.target.username.value
            // const clave = event.target.password.value

            try {
            const loggedInUser = authenticateUser(username, password)
                // localStorage.setItem("usuarioActual",loggedInUser)
                sessionStorage.setItem("usuarioActual", loggedInUser); // Almacena el nombre de usuario en sessionStorage
                

                event.target.reset()
                //ejecuta la funcion cuando envia e logiln
                props.onLoggedIn()
            } catch (error) {
                //passwordInput.setValue('')

                alert(error.message)

                console.error(error)
            }
        }}>
            <label  htmlFor="username">Username 
            <input class="form-control"  placeholder="username" type="text" id="username" style={{ width: '100%', boxSizing: 'border-box' }} />
            </label>

            <label htmlFor="password">Password
            <PasswordInput id="password" placeholder="constraseña" />
            </label>
            <Button type="submit">Login</Button>
        </Form>
      
        {/* <a onClick={props.toRegister}>Register</a> */}
        <a href="" onClick={event => {
            event.preventDefault()

            props.onRegisterClick()
        }}>Register</a>

    </section>
    
}