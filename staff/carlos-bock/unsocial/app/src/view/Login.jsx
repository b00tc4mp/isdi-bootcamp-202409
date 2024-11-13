import './Login.css';

import {PasswordInput, Input, Button, Form, Field, Label} from '../components/library';

import logic from '../logic';

import { errors } from 'com';

const { SystemError } = errors;

export default function Login(props) {
    console.log('Login -> render');

    const handleSubmit = event => {
        event.preventDefault();

        const {target : { username: {value: username}, password: {value: password}}} = event;

        try {
            logic.loginUser(username, password, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else 
                        alert(error.message);

                    console.error(error);

                    return;
                }

                event.target.reset();

                props.onLoggedin();
            })
        } catch (error) {
            alert(error.message);

            console.error(error);
        };
    };

    const handleRegisterClick = event => {
        event.preventDefault();

        props.onRegisterClick();
    };


    return <main className='Login'>
        <h2>Login</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username"/>
            </Field>

            <Field>
                <Label htmlFor="passowrd">Password</Label>
                <PasswordInput id = "password" />
            </Field>

            <Button type="submit">Login</Button>
        </Form>

        <a href="" onClick= {handleRegisterClick}>Register</a>
    </main>
}
