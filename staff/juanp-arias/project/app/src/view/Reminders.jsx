import { useState, useEffect } from 'react'
import { SectionContainer, SectionHeader, Reminder } from './components'
import { Button } from './library'
import logic from '../logic'
import useContext from './useContext'
import { errors } from 'com'

const { SystemError } = errors
export default function Reminders({ date }) {
    const [reminders, setReminders] = useState([])
    const [initiated, setInitiated] = useState(false)
    const { alert } = useContext()

    useEffect(() => {
        try {
            logic.getReminders(date)
                .then(reminders => {
                    setReminders(reminders)
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

    const onNewNoteClick = () => {
        navigate('/notes/new-note')
    }

    return <div className='flex flex-col items-center px-6 py-8 bg-gray-50 min-h-screen pb-12'>
        <SectionContainer>
            <SectionHeader sectionName='reminders' />
            <div className='grid gap-4 p-6'>
                {initiated && reminders.map((reminder) => (
                    <Reminder key={reminder._id} reminder={reminder} />
                ))}
            </div>
            <div className='pr-4 pl-4'>
                <Button onClick={onNewNoteClick}>Add note</Button>
            </div>
        </SectionContainer>
    </div>
}