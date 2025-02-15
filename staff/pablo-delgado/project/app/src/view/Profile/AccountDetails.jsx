//shown info: name, password, change password/email

import { Button, Input, Field, Label } from './library'
import ChangePassword from './ChangePassword'
import ChangeEmail from './ChangeEmail'

import { useNavigate } from 'react-router-dom'

export default function AccountDetails() {
    const navigate = useNavigate()

    const handleBackClick = () => {
        navigate('/profile') // Vuelve al perfil
    }

    return (
        <main className="flex flex-col items-center h-screen w-full px-4">
            {/* Flecha para ir atrás */}
            <button onClick={handleBackClick} className="self-start mt-4">
                ← {/* Cambia este símbolo por una imagen bonita si lo necesitas */}
            </button>

            <h2 className="text-3xl font-bold mt-4 mb-6">Account Details</h2>

            {/* Nombre */}
            <Field className="w-full max-w-md">
                <Label htmlFor="name" className="block mb-1 text-sm font-medium">Name</Label>
                <Input type="text" id="name" value="User Name" disabled className="w-full p-2 border border-gray-300 rounded" />
            </Field>

            {/* Email */}
            <Field className="w-full max-w-md mt-4">
                <Label htmlFor="email" className="block mb-1 text-sm font-medium">Email</Label>
                <Input type="email" id="email" value="user@example.com" disabled className="w-full p-2 border border-gray-300 rounded" />
                <ChangeEmail /> {/* Componente para cambiar el email */}
            </Field>

            {/* Contraseña */}
            <Field className="w-full max-w-md mt-4">
                <Label htmlFor="password" className="block mb-1 text-sm font-medium">Password</Label>
                <Input type="password" id="password" value="********" disabled className="w-full p-2 border border-gray-300 rounded" />
                <ChangePassword /> {/* Componente para cambiar la contraseña */}
            </Field>

            <Button onClick={handleBackClick} className="mt-6 w-full max-w-md text-white bg-blue-500 py-3 rounded-lg hover:bg-blue-600">
                Save Changes
            </Button>
        </main>
    )
}
