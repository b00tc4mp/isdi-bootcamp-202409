import './Register.css'

import registerUser from '../logic/registerUser'
import PasswordInput from '../components/library/PasswordInput'
import Input from '../components/library/Input'
import Button from '../components/library/Button'
import Form from '../components/library/Form'
import Field from '../components/library/Field'
import Label from '../components/library/Label'


function Register(props) {

    return <section className="Register">
        <h2>Register</h2>

        <Form onSubmit={event => {

            event.preventDefault()

            const { target: form } = event

            //CAPTURO LOS VALORES DEL REGISTER (FORMULARIO)
            //LOS NOMBRES QUE CAPTURAS ES IMPORTANTE QUE COINCIDAN CON EL ID DEL INPUT
            const {
                name: { value: name },
                email: { value: email },
                username: { value: username },
                password: { value: password },
                ['password-repeat']: { value: passwordRepeat }
            } = form


            try {

                //LLAMO A LA FUNCION REGISTER USER CON LOS PARAMETROS CAPTURADOS
                registerUser(name, email, username, password, passwordRepeat)

                //RESETEO DEL FORMULARIO
                form.reset() // => form.reset()

                //LE PASO LA FUNCIÓN "registered" DEL PARAMERTRO PROPS PARA DECIRLE A APP QUE ME HE LOGGEADO
                props.registered()


            } catch (error) {
                alert(error.message)

                console.error(error)
            }

        }}>
            <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" />
            </Field>

            <Field>
                <Label htmlFor="email">E-mail</Label>
                <Input type="email" id="email" />
            </Field>

            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Field>
                <Label htmlFor="passwordRepeat">Repeat Password</Label>
                <PasswordInput id="password-repeat" />
            </Field>

            <Button type="submit">Register</Button>
        </Form>

        <a href=""
            onClick={event => {
                event.preventDefault()

                props.registered()
            }}>Login</a>
    </section>
}

export default Register