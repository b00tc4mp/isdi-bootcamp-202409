import { errors } from 'com'

import logic from '../logic'

const { SystemError } = errors

import useContex from './useContext'

import logoTemp from '../../public/logoTemp.png'

import { Button, Field, Input, Label, Image } from '../library'

export default function Login(props) {
    console.log('Login -> render')

    const { alert } = useContex()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: { username: { value: username }, password: { value: password } } } = event

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset() //Clean the login form
                    props.onLoggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, there was a problem, try it again later')
                    else
                        alert(error.message)
                })

        } catch (error) {
            alert(error.message)
            console.error(error)

        }
    }


    const handleRegisterClick = event => {
        event.preventDefault()
        props.onRegisterClick()
    }

    return <main className="flex flex-col items-center justify-center bg-color_backgroundGrey w-full flex-grow">
        <h1 className="text-3xl font-bold text-color_primary mb-4">Hourify</h1>

        {/* Container to center content */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
            <div className="flex flex-col items-center">

                {/* Logo */}
                <Image
                    src={logoTemp}
                    alt="Logo Hourify"
                    className="w-20 h-20 mb-4"
                />

                {/* Heading */}
                <h2 className="text-2xl font-bold text-color_darkBlue mb-4">Login</h2>

                {/* Form */}
                <form
                    className="flex flex-col gap-4 w-full"
                    onSubmit={handleSubmit}
                >
                    <Field>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            id="username"
                            placeholder="Your username"
                            required={true}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary"
                        />
                    </Field>

                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            placeholder="Your password"
                            required={true}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-color_primary"
                        />
                    </Field>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="bg-color_primary text-white px-4 py-2 rounded-md hover:bg-color_primaryHover transition"
                    >
                        Login
                    </Button>
                </form>

                {/* Register Link */}
                <p className="mt-4 text-gray-600">
                    Don't have an account yet?{" "}
                    <a
                        href="#"
                        title="Create a new account"
                        onClick={handleRegisterClick}
                        className="text-color_primary hover:underline"
                    >
                        Create account
                    </a>
                </p>
            </div>
        </div>
    </main>

    /* <main className="flex flex-col justify-center items-center bg-color_backgroundGrey w-full h-screen">
    <Image src={logoTemp} alt="Logo Hourify" className="size-20"></Image>

    <h2>Login</h2>

    <form className="flex flex-col justify-items-start" onSubmit={handleSubmit}>
        <Field>
            <Label htmlFor="username">Username</Label>
            <Input type="text" id="username" placeholder="Your username" />
        </Field>

        <Field>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Your password" />
        </Field>

        <Button type="submit" >Login</Button>
    </form>

    <p>Don't have an account yet? <a href="" title="Create a new account" onClick={handleRegisterClick}>Create account</a></p>
</main> */



}