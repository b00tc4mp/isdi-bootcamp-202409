import { useState } from 'react';
import { errors } from 'com';

const { SystemError } = errors;

import { PasswordInput, Input, Button, Form, Field, Label } from './library';
import { LeftArrow } from './icons/LeftArrow';
import { DogIcon } from './icons/DogIcon.jsx';
import { CatIcon } from './icons/CatIcon.jsx';

import logic from '../logic';
import useContext from './useContext';
import { useNavigate } from 'react-router-dom';

export default function Register(props) {
    console.log('Register -> render');

    const { alert } = useContext();
    const navigate = useNavigate();

    const [petType, setPetType] = useState(null); // Estado para la selección

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
                .registerUser(name, email, password, passwordRepeat, petType)
                .then(() => {
                    // Guardamos el tipo de mascota y el nombre en localStorage
                    localStorage.setItem('petType', petType);
                    localStorage.setItem('userName', name);  // Guardamos el nombre

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
        navigate(-1);
    };

    return (
        <main className="flex justify-center items-center flex-col min-h-screen box-border bg-[#e9d8a6]">

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

                {/* Botones de selección de mascota */}
                <div className="flex justify-center gap-4 my-4">
                <button 
    type="button" 
    className={`p-3 border rounded-full w-16 h-16 flex justify-center items-center ${petType === 'dog' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
    onClick={() => setPetType('dog')}
>
    <DogIcon className="w-10 h-10" />
</button>

<button 
    type="button" 
    className={`p-3 border rounded-full w-16 h-16 flex justify-center items-center ${petType === 'cat' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`} 
    onClick={() => setPetType('cat')}
>
    <CatIcon className="w-10 h-10" />
</button>

                </div>

                <Button type="submit" className="!text-white">Register</Button>
            </Form>

            <a href="" onClick={handleLoginClick}>Login</a>
        </main>
    );
}
