import './Register.css'

import { PasswordInput, Input, Button, Form, Label } from '../components/library'
import logic from '../logic'

export default function Register(props) {

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            username: { value: username },
            password: { value: password },
            repeatpassword: { value: repeatpassword }
        } = form

        try {
            logic.registerUser(name, email, username, password, repeatpassword)
                .then(() => {
                    form.reset()

                    props.onRegistered()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)

                    console.error(error)
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

    return <main className="Register" id="register">
        <h2 className='Register text-3xl'>Register</h2>

        <Form onSubmit={handleSubmit}>
            <Label htmlfor="name" >Name</Label>
            <Input type="text" id="name" placeholder="name" />

            <Label htmlfor="email">E-mail</Label>
            <Input type="email" id="email" placeholder="email" />

            <Label htmlfor="username">Username</Label>
            <Input type="text" id="username" placeholder="username" />

            <Label htmlfor="password">Password</Label>
            <PasswordInput id="password" placeholder="password" />

            <Label htmlfor="repeatpassword">Repeat Password</Label>
            <PasswordInput id="repeatpassword" placeholder="repeat password" />

            <Button type="submit"><strong>REGISTER</strong></Button>
        </Form>
        <a href="" onClick={handleLoginClick}>Login</a>
    </main>
}
