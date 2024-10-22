import './Login.css'

import authenticateUser from '../logic/authenticateUser'
import PasswordInput from '../Components/library/PasswordInput'
import Input from '../Components/library/Input'
import Button from '../Components/library/Button'
import Form from '../Components/library/Form'
import Field from '../Components/library/Field'
import Label from '../Components/library/Label'

function Login(props) {

    return <section className="Login">
        <h2>Login</h2>

        <Form onSubmit={event => {

            event.preventDefault()

            //CAPTURO LOS VALORES DEL USERNAME Y PASSWORD DEL TARGET DEL EVENTO (FORMULARIO)
            //LOS NOMBRES QUE CAPTURAS ES IMPORTANTE QUE COINCIDAN CON EL ID DEL INPUT
            const { target:
                { username: { value: username },
                    password: { value: password }
                }
            } = event

            try {
                sessionStorage.loggedInUserId = authenticateUser(username, password)
                //RESETEO DEL FORMULARIO
                event.target.reset() // => form.reset()

                //LE PASO LA FUNCIÓN ONLOGGEDIN DEL PARAMERTRO PROPS PARA DECIRLE A APP QUE ME HE LOGGEADO
                props.onLoggedIn()

            } catch (error) {
                //passwordInput.setValue('')

                alert(error.message)

                console.error(error)
            }

        }}>

            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Button type="submit">Login</Button>

            <label>Don't have an account?</label>
        </Form>



        <a href=""
            onClick={event => {
                event.preventDefault()

                props.onRegisterLink()
            }}>
            Register</a>

    </section>
}

export default Login