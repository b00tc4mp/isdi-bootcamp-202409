//import './Register.css'

import { PasswordInput, Label, Input, Button, Field, Form } from '../components/library'
import logic from '../logic'

import { errors } from 'com'

const { OwnershipError, CredentialsError, SystemError } = errors


//Funcion register, que mostrará el formulario de registro
//export default (props) => {
export default function ManageUsers() {


    //flex items-center justify-center min-h-screen bg-gray-100
    return <main className="flex justify-center min-h-screen">
        <div className="container bg-blue-900 p-8 rounded-md">

            <h2 className="text-3xl">Manage Users</h2>

            <p>Aquí pondré una tabla que muestra los usuarios registrados</p>

            {/* Tabla temporal */}
            <table className="table-auto w-full mt-4 bg-white text-black rounded-md">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">ID</th>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">1</td>
                        <td className="border px-4 py-2">admin</td>
                        <td className="border px-4 py-2">Admin</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">2</td>
                        <td className="border px-4 py-2">user1</td>
                        <td className="border px-4 py-2">Regular</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">1</td>
                        <td className="border px-4 py-2">admin</td>
                        <td className="border px-4 py-2">Admin</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">2</td>
                        <td className="border px-4 py-2">user1</td>
                        <td className="border px-4 py-2">Regular</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">1</td>
                        <td className="border px-4 py-2">admin</td>
                        <td className="border px-4 py-2">Admin</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">2</td>
                        <td className="border px-4 py-2">user1</td>
                        <td className="border px-4 py-2">Regular</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">1</td>
                        <td className="border px-4 py-2">admin</td>
                        <td className="border px-4 py-2">Admin</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">2</td>
                        <td className="border px-4 py-2">user1</td>
                        <td className="border px-4 py-2">Regular</td>
                    </tr>
                </tbody>
            </table>


        </div>
    </main>
}