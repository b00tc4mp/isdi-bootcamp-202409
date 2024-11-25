import { useState, useEffect } from 'react'
import { PasswordInput, Label, Input, Button, Field, Form } from '../components/library'
import logic from '../logic'

import { errors } from 'com'

const { OwnershipError, CredentialsError, SystemError } = errors


//Funcion register, que mostrará el formulario de registro
//export default (props) => {
export default function ManageUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        console.log('Users / UsersList -> componentDidMount')

        try {
            console.log(users)
            logic.getUsers((error, users) => {
                if (error) {
                    alert(error.message)
                    console.error(error)
                    return
                }
                console.log('Users fetched successfully:', users);
                setUsers(users)
            })

        } catch (error) {
            alert(error.message);
            console.error(error)
        }
    }, [])

    //flex items-center justify-center min-h-screen bg-gray-100
    return <main className="flex justify-center min-h-screen">
        <div className="container bg-blue-900 p-8 rounded-md">

            <h2 className="text-3xl">Manage Users</h2>

            <p>Aquí pondré una tabla que muestra los usuarios registrados</p>

            {/* Tabla temporal */}
            <table className="table-auto w-full mt-4 bg-white text-black rounded-md">
                <thead>
                    <tr className='bg-amarilloCanario'>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Username</th>
                        <th className="border px-4 py-2">E-mail</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr key={user.id}>
                                <td className='border px-4 py-2'>{user.name}</td>
                                <td className='border px-4 py-2'>{user.username}</td>
                                <td className='border px-4 py-2'>{user.email}</td>
                                <td className='border px-4 py-2'>{user.role}</td>
                                <td className='border px-4 py-2'>✏️ ❌ ⛔</td>
                            </tr>
                        ))

                    /* <tr>
                        <td className="border px-4 py-2">Galadriel</td>
                        <td className="border px-4 py-2">galadriel</td>
                        <td className="border px-4 py-2">galadriel@middleearth.com</td>
                        <td className="border px-4 py-2">regular</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Frodo Baggins</td>
                        <td className="border px-4 py-2">frodo</td>
                        <td className="border px-4 py-2">frodo@middleearth.com</td>
                        <td className="border px-4 py-2">regular</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Samwise Gamgee</td>
                        <td className="border px-4 py-2">samwise</td>
                        <td className="border px-4 py-2">samwise@middleearth.com</td>
                        <td className="border px-4 py-2">regular</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Gandalf</td>
                        <td className="border px-4 py-2">gandalf</td>
                        <td className="border px-4 py-2">gandalf@middleearth.com</td>
                        <td className="border px-4 py-2">admin</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Aragorn</td>
                        <td className="border px-4 py-2">aragorn</td>
                        <td className="border px-4 py-2">aragorn@middleearth.com</td>
                        <td className="border px-4 py-2">moderator</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Legolas</td>
                        <td className="border px-4 py-2">legolas</td>
                        <td className="border px-4 py-2">legolas@middleearth.com</td>
                        <td className="border px-4 py-2">regular</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Gimli</td>
                        <td className="border px-4 py-2">gimli</td>
                        <td className="border px-4 py-2">gimli@middleearth.com</td>
                        <td className="border px-4 py-2">regular</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Galadriel</td>
                        <td className="border px-4 py-2">galadriel</td>
                        <td className="border px-4 py-2">galadriel@middleearth.com</td>
                        <td className="border px-4 py-2">admin</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Boromir</td>
                        <td className="border px-4 py-2">boromir</td>
                        <td className="border px-4 py-2">boromir@middleearth.com</td>
                        <td className="border px-4 py-2">moderator</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Éowyn</td>
                        <td className="border px-4 py-2">eowyn</td>
                        <td className="border px-4 py-2">eowyn@middleearth.com</td>
                        <td className="border px-4 py-2">regular</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">Théoden</td>
                        <td className="border px-4 py-2">theoden</td>
                        <td className="border px-4 py-2">theoden@middleearth.com</td>
                        <td className="border px-4 py-2">admin</td>
                    </tr> */}
                </tbody>
            </table>


        </div>
    </main>
}