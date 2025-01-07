import logic from '../../logic'
import { SectionHeader } from './index.js'
import { Label, Input, DoneButton, CancelButton, Form } from '../library'
import useContext from '../useContext.js'
import { useState, useEffect } from 'react'
import { errors } from 'com'

const { SystemError } = errors
export default function CreateGroup({ onCreated, onCancelClick }) {
    const { alert } = useContext()
    const [users, setUsers] = useState([])
    const [initiated, setInitiated] = useState(false)
    const [selectedUsers, setSelectedUsers] = useState([])

    useEffect(() => {
        try {
            logic.getUsers()
                .then(users => {
                    setUsers(users)
                    setInitiated(true)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert(`We're having some troubles, please try again later`)
                    else
                        alert(error.message)
                    console.error(error)
                    return
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [])

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const { name: { value: name } } = form
        const students = selectedUsers.map(user => user.id)
        try {
            logic.createGroup(name, students)
                .then(() => {
                    form.reset()
                    alert('Group created', 'success')
                    onCreated()
                })
                .catch((error) => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleUserClick = user => { if (!selectedUsers.find((u) => u.id === user.id)) { setSelectedUsers([...selectedUsers, user]) } }

    const handleRemoveUser = userId => { setSelectedUsers(selectedUsers.filter((user) => user.id !== userId)) }

    const handleCancelClick = event => {
        event.preventDefault()
        onCancelClick()
    }
    return <main className='rounded-lg'>
        <SectionHeader sectionName='new-group' />
        <div className='bg-white p-4 dark:bg-gray-800'>
            <Form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor='name'>Group's name</Label>
                    <Input type='text' id='name' placeholder='Name' />
                </div>
                <div className='mt-2'>
                    <Label>Add users</Label>
                    <ul className='border border-gray-300 rounded-lg dark:border-gray-600'>
                        {users.map((user) => (
                            <li key={user.id} className='cursor-pointer p-2 hover:bg-blue-100 dark:hover:bg-blue-950 rounded-lg' onClick={() => handleUserClick(user)}>{user.name} ({user.email}) ({user.role})</li>
                        ))}
                    </ul>
                </div>
                <div className='mt-2'>
                    <Label>Users selected</Label>
                    <ul className='border border-gray-300 rounded-lg dark:border-gray-600'>
                        {selectedUsers.map((user) => (
                            <li key={user.id} className='flex justify-between items-center p-2'>
                                <span>{user.name} ({user.email}) ({user.role})</span>
                                <button className='text-red-500 hover:underline dark:text-red-700' onClick={() => handleRemoveUser(user.id)}>Eliminar</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='flex justify-end space-x-2 mr-1 mt-3'>
                    <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                    <DoneButton type='submit'>Done</DoneButton>
                </div>
            </Form>
        </div>
    </main>
}