import { Form, Field, Label, Input, Button, Anchor } from './library'

import logic from './../logic'

import { NoUserLoggedInAlert } from './components'

import { errors } from 'com'
const { SystemError } = errors

export default function Login(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset()

                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)

            event.target.password.value = ""
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterAnchorClick()
    }

    return <main className="h-screen w-screen bg-cover bg-center flex flex-col"
        style={{
            backgroundImage: "url('/images/going_merry.png')"
        }}>

        <h2 className="mt-[10rem] text-[2.5rem]">Login</h2>

        <Form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-[10px]">
            <Field className="flex flex-col">
                <Label htmlFor="username" className="text-[1.25rem]">Username</Label>
                <Input type="text" id="username" autoComplete="on" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
            </Field>

            <Field className="flex flex-col">
                <Label htmlFor="password" className="text-[1.25rem]">Password</Label>
                <Input type="password" id="password" autoComplete="off" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
            </Field>

            <Button type="submit" className="text-[1.25rem]">Login</Button>
        </Form>

        <Anchor href="" onClick={handleRegisterClick} className="underline text-[1.25rem] mt-[15px]">Register</Anchor>
    </main>
}