import { PasswordInput, Input, Button, Form, Field, Label } from './library'

import logic from '../logic'

export default function Register(props) {
    console.log('RegisterCentre -> render')

    const handleSubmit= event => {
        event.preventDefault()

        const { target: form } = event

        const {
            name: { value: name },
            email: { value: email },
            password: { value: password },
            ['password-repeat'] : { value: passwordRepeat},
            addressLine1: { value: addressLine1 },
            addressLine2: { value: addressLine2 },
            country: { value: country },
            city: { value: city },
            postcode: { value: postcode },
        } = form

        try {
            logic.registerUser(name, email, password, passwordRepeat, addressLine1, addressLine2, country, city, postcode, error => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                form.reset()

                props.onRegister()
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

    return <main>
        <h2 className="mt-14">Register as Dive Center</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="name">Name</Label>
                <Input type="text" id="name" />
            </Field>

            <Field>
                <Label htmlFor="email">E-mail</Label>
                <Input type="email" id="email" />
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Field>
                <Label htmlFor="password-repeat">Repeat Password</Label>
                <PasswordInput id="password-repeat" />
            </Field>

            <Field>
                <Label htmlFor="addressLine1">Address Line 1</Label>
                <Input type="text" id="addressLine1" />
            </Field>

            <Field>
                <Label htmlFor="addressLine2">Address Line 2</Label>
                <Input type="text" id="addressLine2" />
            </Field>

            <Field>
                <Label htmlFor="country">Country</Label>
                <Input type="text" id="country" />
            </Field>

            <Field>
                <Label htmlFor="city">City</Label>
                <Input type="text" id="city" />
            </Field>

            <Field>
                <Label htmlFor="postcode">Postcode</Label>
                <Input type="text" id="postcode" />
            </Field>

            <Button type="submit">Register</Button>
        </Form>

        <a href="" onClick={handleLoginClick}>Login</a>
    </main>
}