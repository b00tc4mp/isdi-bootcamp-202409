import { useState, useEffect } from 'react'
import { SectionHeader, Reminder } from './components'
import { Button } from './library'
import logic from '../logic'
import useContext from './useContext'
import { errors } from 'com'

const { SystemError } = errors
export default function Reminders({ date, onAcceptedClick, onCancelClick, onEditClick }) {
    const [reminders, setReminders] = useState([])
    const [initiated, setInitiated] = useState(false)
    const { alert, confirm } = useContext()

    useEffect(() => {
        try {
            logic.getReminders(date)
                .then(reminders => {
                    if (reminders.length === 0)
                        confirm(`It looks like you don't have any reminder for this day, want to create it?`, accepted => {
                            if (accepted) {
                                try {
                                    onAcceptedClick()
                                } catch (error) {
                                    alert(error.message)
                                    console.error(error)
                                }
                            } else {
                                onCancelClick()
                            }
                        }, 'warn')
                    else {
                        setReminders(reminders)
                        setInitiated(true)
                    }
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

    const onDoneClick = event => {
        event.preventDefault()
        onCancelClick()
    }

    const handleDeleted = () => {
        try {
            logic.getReminders(date)
                .then(reminders => {
                    if (reminders.length === 0) {
                        onCancelClick()
                    }
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
    }

    return <article>
        <SectionHeader sectionName='reminders' />
        <div className='grid gap-4 p-6'>
            {initiated && reminders.map((reminder) => (
                <Reminder key={reminder.id} reminder={reminder} onEditClick={onEditClick} onDeleted={handleDeleted} />
            ))}
        </div>
        <div className='pr-4 pl-4'>
            <Button onClick={onDoneClick}>Done</Button>
        </div>
    </article>
}