import { Form, Field, Label, Input, Button, Anchor } from './library'

import logic from './../logic'

import { errors } from 'com'
const { SystemError } = errors

import useContext from './useContext'

export default function Login(props) {
    const { alert } = useContext()

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

    return <main className="h-screen w-screen bg-cover bg-center flex flex-col items-center"
        style={{
            backgroundImage: "url('/images/going_merry.png')"
        }}>

        <section className="bg-[rgba(215,167,104,0.9)] mt-[10rem] w-[20rem] h-[22rem] border-[2.5px] border-[black] rounded-[1rem]">

            <h2 className="text-[2rem] mt-[1rem] mb-[1rem]">Login</h2>

            <Form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-[10px] mb-[1.5rem]">
                <Field className="flex flex-col">
                    <Label htmlFor="username" className="text-[1.25rem]">Username</Label>
                    <Input autoFocus type="text" id="username" autoComplete="off" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
                </Field>

                <Field className="flex flex-col">
                    <Label htmlFor="password" className="text-[1.25rem]">Password</Label>
                    <Input type="password" id="password" autoComplete="off" className="w-[220px] rounded-[.5rem] border-[2px] border-black px-[.35rem] focus:outline-none"></Input>
                </Field>

                <Button type="submit" className="text-[1.25rem] mt-[.5rem] bg-[rgba(175,255,255,0.8)] border-[2px] border-[black] rounded-[.5rem] px-[.75rem] transition-transform duration-100 ease-in-out hover:scale-110">Login</Button>
            </Form>

            <Anchor href="" onClick={handleRegisterClick} className="underline text-[1.25rem]">Register</Anchor>
        </section>
    </main>
}