import { PasswordInput, Input, Button, Form, Field, Label } from '../library/index.js'
import logic from '../../logic/users/index.js'

export default function Register(props) {
    console.log('RegisterCentre -> render')

    const handleSubmit = async event => {
        event.preventDefault()

        const { target: form } = event
        const {
            name: { value: name },
            email: { value: email },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat },
            address: { value: address },
            country: { value: country },
            city: { value: city },
            postcode: { value: postcode },
        } = form

        try {
            await logic.registerUserCenter(
                name, email, password, passwordRepeat, 
                address, country, city, postcode, 'center'
            )
            form.reset()
            props.onRegistered()
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()
        props.onLoginClick()
    }

    return (
        <main 
            className="flex flex-col justify-center items-center h-screen"
            style={{ backgroundImage: "url('https://www.treehugger.com/thmb/OLxBN3vbTzvgFCeUdlyIMXxu_M8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1279110759-d280cdc3b0b842c2bde02b8e5f7238a8.jpg')" }}
        >
            <div className="bg-gray-100 shadow-md p-4 rounded-lg max-w-md flex flex-col items-center">
                <h2 className="text-2xl font-bold text-center mb-5">Register as <span className="text-yellow-500">Dive Center</span></h2>

                <Form onSubmit={handleSubmit} className="flex flex-col gap-y-2 w-full">
                    <Field>
                        <Label htmlFor="name">Name</Label>
                        <Input type="text" id="name" name="name" />
                    </Field>

                    <Field>
                        <Label htmlFor="email">E-mail</Label>
                        <Input type="email" id="email" name="email" />
                    </Field>

                    <Field>
                        <Label htmlFor="password">Password</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                        >
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">🔒</span>
                        </PasswordInput>
                    </Field>

                    <Field>
                        <Label htmlFor="password-repeat">Repeat Password</Label>
                        <PasswordInput
                            id="password-repeat"
                            name="password-repeat"
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                        >
                            <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400">🔓</span>
                        </PasswordInput>
                    </Field>

                    <Field>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" />
                    </Field>

                    <Field>
                        <Label htmlFor="country">Country</Label>
                        <Input id="country" name="country" />
                    </Field>

                    <Field>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" />
                    </Field>

                    <Field>
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input id="postcode" name="postcode" />
                    </Field>

                    <Button type="submit" className="w-full sm:w-auto mt-4">Register</Button>
                </Form>

                <p className="text-center mb-1 text-gray-600">Already have an account?</p>
                <a 
                    href="#"
                    onClick={handleLoginClick} 
                    className="text-blue-500 hover:text-blue-700"
                >
                    Login
                </a>
            </div>
        </main>
    )
}