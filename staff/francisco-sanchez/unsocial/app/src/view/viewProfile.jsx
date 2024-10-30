import './viewProfile.css'
import getUserData from '../logic/getUserData'

//import { Label, Input, Button, Field, Form, password, passwordInput } from '../components/library'
import { PasswordInput, Input, Button, Form, Field, Label } from '../components/library'


//En esta función cargaremos el perfil del usuario
export default function viewProfile(props) {

    {/*Obtenemos los datos del usuario */ }
    const { name, email, username, password } = getUserData(sessionStorage.userId)

    return <main className="User profile">
        <div className="container">
            <h2>User Profile</h2>

            <Form>
                <Field>
                    <Label htmlFor="Name">Name</Label>
                    <Input type="text" id="name" defaultValue={name}></Input>
                </Field>
                <Field>
                    <Label htmlFor="username">Username</Label>
                    <Input type="text" id="username" defaultValue={username}></Input>
                </Field>
                <Field>
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" id="email" defaultValue={email}></Input>
                </Field>
                <Field>
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput id="password" defaultValue={password} />
                </Field>
                <Field>
                    <Label htmlFor="passwordRepeat">Repeat Password</Label>
                    <PasswordInput id="passwordRepeat" defaultValue={password} />
                </Field>
                <Button type="submit">Actualizar</Button>
            </Form>

            <a href=""
                onClick={event => {
                    event.preventDefault()
                    props.onHomeClick()
                }}>Go back</a>
        </div>
    </main>
}