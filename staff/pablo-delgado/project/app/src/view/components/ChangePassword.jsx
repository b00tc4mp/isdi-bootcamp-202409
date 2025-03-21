import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordInput, Button, Form, Field, Label } from '../library';

export default function ChangePassword(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            navigate('/login'); // Redirige a login si no está logueado
        } else {
            setIsLoggedIn(true);
        }
    }, [navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const { target: { password: { value: currentPassword }, 'new-password': { value: newPassword }, 'new-password-repeat': { value: repeatPassword } } } = event;

        if (newPassword !== repeatPassword) {
            alert('Passwords do not match');
            return;
        }

        // Lógica de cambio de contraseña (aquí deberías enviar la nueva contraseña al backend)
        alert('Password changed successfully');
    };

    return (
        isLoggedIn && (
            <section className="flex justify-center items-center flex-col h-full box-border bg-[var(--back-color)]">
                <h3>Change Password</h3>

                <Form onSubmit={handleSubmit}>
                    <Field>
                        <Label htmlFor="password">Current password</Label>
                        <PasswordInput id="password" required />
                    </Field>

                    <Field>
                        <Label htmlFor="new-password">New password</Label>
                        <PasswordInput id="new-password" required />
                    </Field>

                    <Field>
                        <Label htmlFor="new-password-repeat">Repeat new password</Label>
                        <PasswordInput id="new-password-repeat" required />
                    </Field>

                    <Button type="submit">Change Password</Button>
                </Form>
            </section>
        )
    );
}

export { ChangePassword }
