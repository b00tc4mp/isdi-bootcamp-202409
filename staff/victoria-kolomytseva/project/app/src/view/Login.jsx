import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'
import { errors } from 'com'
const { systemError } = errors

// import { useContext } from './useContext'

export default function Login(props) {
    // const { alert } = useContext()


    const handleSubmit = event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        try {
            logic.loginUser(email, password)
                .then(() => {
                    event.target.reset()

                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        console.log('Sorry, try again later.')
                    else
                        console.log(error.message)

                    console.error(error)
                })
        } catch (error) {
            console.error(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="flex justify-center items-center flex-col h-screen box-border bg-cover bg-no-repeat"
        style={{ backgroundImage: 'url(./assets/background_login.jpg)' }}>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Input type="email" id="email" placeholder="email" />
            </Field>

            <Field>
                <PasswordInput id="password" placeholder="password" />
            </Field>

            <Button type="submit" className="from-primary-light to-primary-dark bg-gradient-to-b mt-10">Sign in</Button>
        </Form>

        <p className='text-white mt-8'>you don't have a password yet?</p>

        <Button className=" bg-secondary mt-2 w-52" onClick={handleRegisterClick}>Register</Button>

        <p className='text-white mt-2'>recover my password</p>
    </main>
}
