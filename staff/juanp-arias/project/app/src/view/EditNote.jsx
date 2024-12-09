import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SectionContainer, SectionHeader } from './components'
import { Form, Button } from './library'
import { errors } from 'com'
import logic from '../logic'
import useContext from './useContext'

const { SystemError } = errors

export default function EditNote({ onCancelClick, onEdited }) {
    const [note, setNote] = useState(null)
    const { alert } = useContext()
    const { noteId } = useParams()

    useEffect(() => {
        try {
            logic.getNote(noteId)
                .then(noteData => {
                    setNote(noteData)
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
    }, [noteId])

    if (!note) return <p>Cargando nota...</p>

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const { textarea: { value: text } } = form
        try {
            logic.updateNote(noteId, text)
                .then(onEdited)
                .catch((error) => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleCancelClick = event => {
        event.preventDefault()
        onCancelClick()
    }

    return <main className='flex flex-col items-center px-6 py-8 bg-gray-50 min-h-screen pb-12'>
        <SectionContainer className='w-full max-w-4xl bg-white shadow-lg rounded-lg p-6'>
            <SectionHeader sectionName='notes' className='text-blue-700 font-semibold text-2xl mb-4' />
            <Form onSubmit={handleSubmit} className='mt-4 w-full space-y-6'>
                <div className='m-2'>
                    <textarea id='textarea' className='w-full h-60 p-4 border border-gray-300 bg-gray-50 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none text-gray-800' defaultValue={note.text} />
                    <div className='flex justify-end space-x-4 mt-4'>
                        <button type='submit' className='bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200'>Done</button>
                        <button onClick={handleCancelClick} className='bg-gray-400 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-500 transition duration-200'>Cancel</button>
                    </div>
                </div>
            </Form>
        </SectionContainer>
    </main >
}
