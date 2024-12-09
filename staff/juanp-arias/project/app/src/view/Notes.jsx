import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionContainer, SectionHeader, Note } from './components'
import { Button } from './library'
import logic from '../logic'
import useContext from './useContext'
import { errors } from 'com'

const { SystemError } = errors
export default function Notes({ onEditClick }) {
    const [notes, setNotes] = useState([])
    const [initiated, setInitiated] = useState(false)
    const { alert } = useContext()
    const navigate = useNavigate()

    useEffect(() => {
        try {
            logic.getNotes()
                .then(notes => {
                    setNotes(notes)
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

    const handleDeleted = () => {
        try {
            logic.getNotes()
                .then(notes => {
                    setNotes(notes)
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
    }
    
    const onNewNoteClick = () => {
        navigate('/notes/new-note')
    }

    return <div className='flex flex-col items-center px-6 py-8 bg-gray-50 min-h-screen pb-12'>
        <SectionContainer>
            <SectionHeader sectionName='notes' />
            <div className='grid grid-cols-2 gap-4 p-6'>
                {initiated && notes.map((note) => (
                    <Note onEditClick={onEditClick} key={note.id} note={note} onDeleted={handleDeleted} />
                ))}
            </div>
            <div className='pr-4 pl-4'>
                <Button onClick={onNewNoteClick}>Add note</Button>
            </div>
        </SectionContainer>
    </div>
}