import './Login.css'

import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'

import logic from '../logic'

import { errors } from 'com'

const { SystemError } = errors


export default function Login(props) {
    const handleSubmit = event => {
        event.preventDefault()

        //CAPTURO LOS VALORES DEL USERNAME Y PASSWORD DEL TARGET DEL EVENTO (FORMULARIO)
        //LOS NOMBRES QUE CAPTURAS ES IMPORTANTE QUE COINCIDAN CON EL ID DEL INPUT
        const { target:
            { username: { value: username },
                password: { value: password }
            }
        } = event

        try {
            logic.loginUser(username, password)
                .then(() => {
                    //RESETEO DEL FORMULARIO
                    event.target.reset() // => form.reset()

                    //LE PASO LA FUNCIÓN ONLOGGEDIN DEL PARAMERTRO PROPS PARA DECIRLE A APP QUE ME HE LOGGEADO
                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Si hombre')
                    else
                        alert(error.message)

                    console.error(error)
                })

        } catch (error) {
            //passwordInput.setValue('')

            alert(error.message)

            console.error(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="Login">
        <h2>Login</h2>

        <Form onSubmit={handleSubmit}>

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



        <a href="" onClick={handleRegisterClick}> Register</a>

    </main>
}
