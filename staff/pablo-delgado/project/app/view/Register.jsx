import { useAppContext } from './useContext.jsx';
import { useNavigate, useLocation } from 'react-router-dom';
import { errors } from '../../com/index.js';
import { PasswordInput, Input, Button, Form, Field, Label } from './lib/index.js';
import logic from '../logic/index.js';
import { RegisterForm } from './components/RegisterForm.jsx';
import { ArrowLeft } from 'phosphor-react';

const { SystemError } = errors;

export default function Register(props) {
    const { alert } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const cameFromLogin = location.state?.fromLogin;

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
                    localStorage.setItem('userName', name);
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

    return (
        <div className="relative min-h-screen bg-[#edf6f9]">
            {cameFromLogin && (
                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-6 left-6 p-2 rounded-full bg-[#006D77] hover:bg-blue-600 text-white shadow-md"
                    aria-label="Volver atrás"
                >
                    <ArrowLeft size={24} weight="bold" />
                </button>
            )}

            <RegisterForm onSubmit={handleSubmit} />
        </div>
    );
}
