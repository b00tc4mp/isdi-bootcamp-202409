import { Form, Field, Label, Input, Button, Anchor } from './library'

import { errors } from 'com'
const { SystemError } = errors

import logic from '../logic'

import useContext from './useContext'

export default function Register(props) {
    const { alert } = useContext()

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

                    alert('User successfully registered', 'success')

                    form.reset()

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

    return <main className="h-screen w-screen bg-cover bg-center flex flex-col items-center" style={{
        backgroundImage: "url('/images/going_merry.png')"
    }}>
        <section className="bg-[rgba(215,167,104,0.9)] mt-[10rem] w-[20rem] h-[30rem] border-[2.5px] border-[black] rounded-[1rem]">

            <h2 className="mt-[1rem] text-[2rem] mb-[1rem]">Register</h2>

            <Form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-[10px] mb-[1.5rem]">
                <Field className="flex flex-col">
                    <Label htmlFor="email" className="text-[1.25rem]">E-mail</Label>
                    <Input autoFocus type="email" id="email" autoComplete="off" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
                </Field>

                <Field className="flex flex-col">
                    <Label htmlFor="username" className="text-[1.25rem]">Username</Label>
                    <Input type="text" id="username" autoComplete="off" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
                </Field>

                <Field className="flex flex-col">
                    <Label htmlFor="password" className="text-[1.25rem]">Password</Label>
                    <Input type="password" id="password" autoComplete="off" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
                </Field>

                <Field className="flex flex-col">
                    <Label htmlFor="passwordRepeat" className="text-[1.25rem]">Confirm password</Label>
                    <Input type="password" id="password-repeat" autoComplete="off" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
                </Field>

                <Button type="submit" className="text-[1.25rem] mt-[.5rem] bg-[rgba(175,255,255,0.8)] border-[2px] border-[black] rounded-[.5rem] px-[.75rem] transition-transform duration-100 ease-in-out hover:scale-110">Register</Button>
            </Form>

            <Anchor href="" onClick={handleLoginClick} className="underline text-[1.25rem] mt-[15px]">Login</Anchor>
        </section>
    </main>
}