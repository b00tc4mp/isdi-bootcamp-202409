import { useState, useEffect } from 'react'
import { SectionHeader, Reminder } from './components'
import { Button } from './library'
import logic from '../logic'
import useContext from './useContext'
import { errors } from 'com'

const { SystemError } = errors
export default function Reminders({ date, onDoneClick, onEditClick, onNotRemindersFound }) {
    const [dateReminders, setDateReminders] = useState([])
    const [initiated, setInitiated] = useState(false)
    const { alert } = useContext()

    useEffect(() => {
        try {
            logic.getRemindersByDate(date)
                .then(dateReminders => {
                    setDateReminders(dateReminders)
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

    const handleDoneClick = event => {
        event.preventDefault()
        onDoneClick()
    }

    const handleDeleted = () => {
        try {
            logic.getRemindersByDate(date)
                .then(dateReminders => {
                    if (dateReminders.length === 0) {
                        onNotRemindersFound()
                    }
                    setDateReminders(dateReminders)
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

    return <article>
        <SectionHeader sectionName='reminders' />
        <div className='grid gap-2 p-6'>
            {initiated && dateReminders.map((dateReminder) => (
                <Reminder key={dateReminder.id} dateReminder={dateReminder} onEditClick={onEditClick} onDeleted={handleDeleted} />
            ))}
        </div>
        <div className='pr-4 pl-4'>
            <Button onClick={handleDoneClick}>Done</Button>
        </div>
    </article>
}