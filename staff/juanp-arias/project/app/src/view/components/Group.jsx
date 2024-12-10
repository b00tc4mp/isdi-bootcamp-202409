import logic from '../../logic'
import useContext from '../useContext'
import { useState, useEffect } from 'react'
import { errors } from 'com'
import { SectionContainer, SectionHeader } from './index'
import { Label, Input, Field } from '../library'

const { SystemError } = errors
export default function Group({ group, onDeleted }) {
    const [users, setUsers] = useState([])
    const [initiated, setInitiated] = useState(false)
    const { alert, confirm } = useContext()

    useEffect(() => {
        try {
            logic.getUsers()
                .then(users => {
                    setUsers(users)
                    setInitiated(true)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
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
    // const handleDeleteClick = () => {
    //     confirm('Delete group?', accepted => {
    //         if (accepted) {
    //             try {
    //                 logic.deleteGroup(id)
    //                     .then(onDeleted)
    //                     .catch(error => {
    //                         alert(error.message)
    //                         console.error(error)
    //                     })
    //             } catch (error) {
    //                 alert(error.message)
    //                 console.error(error)
    //             }
    //         }
    //     })
    // }
    // const handleEditClick = () => {
    //     onEditClick(note.id)
    // }

    return <article className='flex flex-col items-center px-6 py-8 bg-gray-50 min-h-screen pb-12'>
        <SectionContainer>
            <SectionHeader sectionName='new group' />
            <h4 className='font-bold text-gray-700 mb-2'>Hola groups</h4>
            <p className='text-sm text-gray-600 mb-2'></p>
            <div className='mt-auto'>
                <Field>
                    <Label htmlFor='name'>Group name</Label>
                    <Input type='text' id='name' placeholder='Name' />
                </Field>
                {initiated && users.map((user) => (
                    <h1>{user.name}</h1>
                ))}
                <div className='space-x-1'>
                    <button className='text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition'>Cancel</button>
                    <button className='text-sm text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-600 transition'>Create</button>
                </div>
            </div>
        </SectionContainer>
    </article>
}