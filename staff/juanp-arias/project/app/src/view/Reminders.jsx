import { useState, useEffect } from 'react'
import { SectionHeader, Reminder } from './components'
import { Button } from './library'
import logic from '../logic'
import useContext from './useContext'
import { errors } from 'com'

const { SystemError } = errors
export default function Reminders({ date, onAcceptedClick, onCancelClick }) {
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

    return <main>
        <SectionHeader sectionName='reminders' />
        <div className='grid gap-4 p-6'>
            {initiated && reminders.map((reminder) => (
                <Reminder key={reminder._id} reminder={reminder} />
            ))}
        </div>
        <div className='pr-4 pl-4'>
            <Button onClick={onDoneClick}>Done</Button>
        </div>
    </main>
}