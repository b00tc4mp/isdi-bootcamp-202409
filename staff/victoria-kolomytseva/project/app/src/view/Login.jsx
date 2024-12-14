import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'
import { errors } from 'com'
const { systemError } = errors

// import { useContext } from './useContext'

export default function Login(props) {
    console.log('Login -> render')

    // const { alert } = useContext()


    const handleSubmit = event => {
        event.preventDefault()

        const { target: { email: { value: email }, password: { value: password } } } = event

        console.log('handleSubmit => ', email, password)

        try {
            logic.loginUser(email, password)
                .then(() => {
                    console.log('hello?')
                    event.target.reset()

                    props.onLoggedIn()
                })
                .catch(error => {
                    console.log('error ', error)
                    if (error instanceof SystemError)
                        console.log('Sorry, try again later.')
                    else
                        console.log(error.message)

                    console.error(error)
                })
        } catch (error) {
            console.log('error login')
            console.log(error.message)

            console.error(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="flex justify-center items-center flex-col h-screen box-border bg-[url('./assets/background_login.png')] bg-no-repeat bg-cover">

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
