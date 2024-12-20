import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SectionContainer, SectionHeader } from '.'
import { Form, CancelButton, DoneButton, Main, Loading } from '../library'
import { errors } from 'com'
import logic from '../../logic'
import useContext from '../useContext'

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

    if (!note) return <Loading />

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

    return <Main>
        <SectionContainer >
            <SectionHeader sectionName='notes' />
            <Form onSubmit={handleSubmit} className='mt-4 w-full space-y-6'>
                <div className='m-2'>
                    <textarea id='textarea' className='w-full h-60 p-4 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-600 focus:outline-none resize-none text-gray-800 dark:text-gray-200' defaultValue={note.text} />
                    <div className='flex justify-end space-x-2 mr-1'>
                        <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                        <DoneButton type='submit'>Done</DoneButton>
                    </div>
                </div>
            </Form>
        </SectionContainer>
    </Main>
}
