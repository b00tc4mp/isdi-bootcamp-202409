import { errors } from 'com';

const { SystemError } = errors;

import { PasswordInput, Input, Button, Form, Field, Label } from './library';
import { LeftArrow } from './icons/LeftArrow';

import logic from '../logic';

import useContext from './useContext';

import { useNavigate } from 'react-router-dom'; // Importa useNavigate


export default function Register(props) {
    console.log('Register -> render');

    const { alert } = useContext();
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleSubmit = event => {
        event.preventDefault();

        const { target: form } = event;

        const {
            name: { value: name },
            email: { value: email },
            password: { value: password },
            ['password-repeat']: { value: passwordRepeat },
        } = form;

        try {
            logic
                .registerUser(name, email, password, passwordRepeat)
                .then(() => {
                    form.reset();

                    alert('User successfully registered', 'success');

                    props.onRegistered();
                })
                .catch(error => {
                    if (error instanceof SystemError) alert('Sorry, try again later.');
                    else alert(error.message);

                    console.error(error);
                });
        } catch (error) {
            alert(error.message);

            console.error(error);
        }
    };

    const handleLoginClick = event => {
        event.preventDefault();

        props.onLoginClick();
    };

    const handleGoBack = () => {
        navigate(-1); // Redirige al usuario a la página anterior
    };

    return (
        <main className="flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]">
            {/* Flecha para volver */}
            <button
    onClick={handleGoBack}
    className="absolute top-4 left-4 p-0 bg-transparent text-black rounded-none"
>
    <LeftArrow className="w-8 h-8 text-black" />
</button>

<div className="text-center mb-8 max-w-md w-full px-4 mt-12">
                <h1 className="text-4xl font-bold">Register</h1>
                <p className="text-lg mt-4 text-gray-600">
                    Register with us and start taking care of your pet the easiest way.
                </p>
            </div>

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

                <Button type="submit" className="!text-white">Register</Button>
            </Form>

            <a href="" onClick={handleLoginClick}>
                Login
            </a>
        </main>
    );
}
