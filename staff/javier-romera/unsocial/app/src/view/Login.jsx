import logic from '../logic'

import { Anchor, Form, Label, Input, Field, Button } from './library'

import { errors } from 'apu'

const { SystemError } = errors

export default props => {
    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)

                    event.target.password.value = ""

                    return
                }
                event.target.reset()

                props.onLoggedIn()
            })

        } catch (error) {
            alert(error.message)
            console.error(error)
            event.target.password.value = ""
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        props.onRegisterClick()
    }

    return <main className="Login flex items-center flex-col h-9/10 bg-[black] mt-12 box-border">
        <h2 className="pt-8 pb-4">Login</h2>

        <Form onSubmit={handleSubmit} classname="flex justify-center flex-col items-center w-full">
            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" autoComplete="on"></Input>
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" autoComplete="off"></Input>
            </Field>

            <Button type="submit" classname="border-solid border-2 px-1.5 py-0.5 border-gray-500 mt-4">Login</Button>
        </Form>
        <Anchor classname="mt-4 underline" href="" onClick={handleRegisterClick}>Register</Anchor>
    </main>
}