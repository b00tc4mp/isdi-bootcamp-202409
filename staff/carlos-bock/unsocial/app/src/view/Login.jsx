/* eslint-disable react/prop-types */
import './Login.css';

import { PasswordInput, Input, Button, Form, Field, Label } from './library';

import logic from '../logic';

import { errors } from 'com';

const { SystemError } = errors;

//import { useContext } from 'react';
import useContext from './useContext.js'

export default function Login(props) { //Login({onLoggedIn, onRegisterClick})
    console.log('Login -> render');

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault();

        const { target: { username: { value: username }, password: { value: password } } } = event;

        try {
            logic.loginUser(username, password)
                .then(() => {
                    event.target.reset()

                    props.onLogggedIn()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later.')
                    else
                        alert(error.message)

                    console.error(error)

                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault();

        props.onRegisterClick();
    };


    return <main className='flex justify-center items-center flex-col h-full box-border bg-black' >
        <h2>Login</h2>

        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="username">Username</Label>
                <Input type="text" id="username" />
            </Field>

            <Field>
                <Label htmlFor="passowrd">Password</Label>
                <PasswordInput id="password" />
            </Field>

            <Button type="submit">Login</Button>
        </Form>

        <a href="" onClick={handleRegisterClick}>Register</a>
    </main>
}


/*

export default function Login({onLoggedIn, onRegisterClick}) {
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

                onLoggedIn();
            })
        } catch (error) {
            alert(error.message);

            console.error(error);
        };
    };

    const handleRegisterClick = event => {
        event.preventDefault();

        onRegisterClick();
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


*/