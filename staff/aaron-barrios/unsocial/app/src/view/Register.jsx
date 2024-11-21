import logic from '../logic'

import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'

import './Register.css'



export default (props) => {
    const handleSubmit = event => {
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
            logic.registerUser(name, email, username, password, passwordRepeat, error => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                //RESETEO DEL FORMULARIO
                form.reset() // => form.reset()

                //LE PASO LA FUNCIÓN "registered" DEL PARAMERTRO PROPS PARA DECIRLE A APP QUE ME HE LOGGEADO
                props.registered()
            })

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginClick()
    }

    return <main className="Register">
        <h2>Register</h2>

        <Form onSubmit={handleSubmit}>
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

        <a href="" onClick={handleLoginClick}>Login</a>
    </main >
}


