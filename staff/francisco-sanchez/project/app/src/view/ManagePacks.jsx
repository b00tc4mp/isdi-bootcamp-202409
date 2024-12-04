import { errors } from 'com'

import logic from '../logic'

const { SystemError } = errors

import useContext from './useContext'

import { Button } from '../library/index';

export default function ManagePacks(props) {

    const handleHomeClick = event => {
        event.preventDefault()
        props.onHomeClick()
    }

    const handleAssignPacks = event => {
        console.log('Assign Pack Clicked');
        props.onAssignPackClick()
    };

    const handleCreatePacks = event => {
        console.log('Create Pack Clicked');
        props.onCreatePackClick()
    };


    return (
        <main className="flex flex-col justify-center items-center bg-color_backgroundGrey w-full h-screen">
            <h1>Manage Packs</h1>
            <p>This will be the page to manage packs</p>

            <table className="table-auto mt-4 w-[80%] bg-white text-black rounded-md">
                <thead>
                    <tr className='bg-amarilloCanario'>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Price</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>

                    {/* {users.map(user => (
                        <tr key={user.id}>
                            <td className='border px-4 py-2'>{user.name}</td>
                            <td className='border px-4 py-2'>{user.username}</td>
                            <td className='border px-4 py-2'>{user.email}</td>
                            <td className='border px-4 py-2'>{user.role}</td>
                            <td className='border px-4 py-2'>✏️ ❌ ⛔</td>
                        </tr>
                    ))} */}

                    <tr>
                        <td className="border px-4 py-2">Single hour</td>
                        <td className="border px-4 py-2">Description for the pack of 5h</td>
                        <td className="border px-4 py-2">50 EUR</td>
                        <td className="border px-4 py-2">✏️ ❌ ⛔</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">5h pack</td>
                        <td className="border px-4 py-2">Description for the pack of 10h</td>
                        <td className="border px-4 py-2">237 EUR</td>
                        <td className="border px-4 py-2">✏️ ❌ ⛔</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">10h pack</td>
                        <td className="border px-4 py-2">Description for the pack of 5h</td>
                        <td className="border px-4 py-2">450 EUR</td>
                        <td className="border px-4 py-2">✏️ ❌ ⛔</td>
                    </tr>

                </tbody>
            </table>




            <div className="flex flex-col ">
                <Button className="btn m-2" onClick={handleAssignPacks}>Assign pack WIP</Button>
                <Button className="btn m-2" onClick={handleCreatePacks}>Create new WIP</Button>

            </div>

            <a href="" title="Go back home" onClick={handleHomeClick}>Back to home</a>
        </main>
    )

}