import { Form, Field, Label, Input, Button, Anchor } from './library'

import { errors } from 'com'
const { SystemError } = errors

import logic from '../logic'

export default function Register(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            email: { value: email },
            username: { value: username },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat }
        } = form

        try {
            logic.registerUser(email, username, password, passwordRepeat)
                .then(() => {
                    logic.isUserRoleAnonymous() && logic.logoutUser()

                    form.reset()

                    alert('User successfully registered', 'success')

                    props.onRegistered()
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
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        props.onLoginAnchorClick()
    }

    return <main className="h-screen w-screen bg-cover bg-center flex flex-col" style={{
        backgroundImage: "url('/images/going_merry.png')"
    }}>
        <h2 className="mt-[10rem] text-[2.5rem]">Register</h2>

        <Form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-[10px]">
            <Field className="flex flex-col">
                <Label htmlFor="email" className="text-[1.25rem]">Email</Label>
                <Input type="email" id="email" autoComplete="on" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
            </Field>

            <Field className="flex flex-col">
                <Label htmlFor="username" className="text-[1.25rem]">Username</Label>
                <Input type="text" id="username" autoComplete="on" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
            </Field>

            <Field className="flex flex-col">
                <Label htmlFor="password" className="text-[1.25rem]">Password</Label>
                <Input type="password" id="password" autoComplete="off" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
            </Field>

            <Field className="flex flex-col">
                <Label htmlFor="passwordRepeat" className="text-[1.25rem]">Confirm password</Label>
                <Input type="password" id="password-repeat" autoComplete="off" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
            </Field>

            <Button type="submit" className="text-[1.25rem]">Register</Button>
        </Form>

        <Anchor href="" onClick={handleLoginClick} className="underline text-[1.25rem] mt-[15px]">Login</Anchor>
    </main>
}