import { PasswordInput, Input, Button, Form, Field, Label } from '../library/index.js'
import { errors } from 'com'
import logic from '../../logic/users/index.js'
const {SystemError}=errors
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
            address: { value: address },
            country: { value: country },
            city: { value: city },
            postcode: { value: postcode },
            
        } = form

        const role = 'center'

        try {
            logic.registerUserCenter(name, email, password, passwordRepeat, address, country, city, postcode, role)
            .then(() => {
                form.reset()
                alert('User registered', 'success')
                props.onRegistered()
            })
            .catch(error => {
                if (error instanceof SystemError)
                    alert('Sorry, try again later.')
                else
                    alert(error.message)
                console.error(error)
                form.reset()
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
                <Input type="text" id="name" name="name"/>
            </Field>

            <Field>
                <Label htmlFor="email">E-mail</Label>
                <Input type="email" id="email" name="email"/>
            </Field>

            <Field>
                <Label htmlFor="password">Password</Label>
                <PasswordInput id="password" name="password"/>
            </Field>

            <Field>
                <Label htmlFor="password-repeat">Repeat Password</Label>
                <PasswordInput id="password-repeat" name="password-repeat"/>
            </Field>

            <Field>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address"/>
            </Field>

            <Field>
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country"/>
            </Field>

            <Field>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city"/>
            </Field>

            <Field>
                <Label htmlFor="postcode">Postcode</Label>
                <Input id="postcode" name="postcode"/>
            </Field>

            <Button type="submit">Register</Button>
        </Form>

        <a href="" onClick={handleLoginClick}>Login</a>
    </main>
}