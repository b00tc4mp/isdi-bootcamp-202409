import { useState, useEffect, useRef } from 'react'
import { SectionHeader, SectionContainer, CreateReminder } from './components'
import { CalendarButton, Button, Main } from './library'
import { getFirstDayWeek, getMonthDays, getMonthName, getYear } from '../logic/calendar/index.js'
import { Reminders } from './index.js'
import logic from '../logic/index.js'
import { errors } from 'com'
import useContext from './useContext.js'

const { SystemError } = errors
export default function Calendar({ onEditClick }) {
    const [reminders, setReminders] = useState([])
    const { alert, confirm } = useContext()
    const [dateReminders, setDateReminders] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedDay, setSelectedDay] = useState(null)
    const [view, setView] = useState(null)
    const remindersView = useRef(null)
    const createRemindersView = useRef(null)

    useEffect(() => {
        try {
            logic.getReminders()
                .then(reminders => { setReminders(reminders) })
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

    useEffect(() => {
        if (view === 'reminders' && remindersView.current) { remindersView.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
        if (view === 'new-reminder' && createRemindersView.current) { createRemindersView.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
    }, [view])

    const onNewReminderClick = () => { setView(view ? null : 'new-reminder') }
    const handleDoneClick = () => { setView(view ? null : 'reminders') }

    const onRemindersClick = () => {
        try {
            logic.getRemindersByDate(date)
                .then(dateReminders => {
                    if (dateReminders.length === 0) {
                        confirm(`You don't have any reminders scheduled for this day. Would you like to create one?`, accepted => {
                            if (accepted) { setView('new-reminder') }
                        }, 'warn')
                    } else {
                        setDateReminders(dateReminders)
                        setView(view ? null : 'reminders')
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
    }
    const handleReminderDeleted = () => {
        try {
            logic.getReminders()
                .then(updatedReminders => {
                    setReminders(updatedReminders)
                    setView(view ? null : 'reminders')
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
    const onReminderCreated = () => {
        try {
            logic.getReminders()
                .then(updatedReminders => {
                    setReminders(updatedReminders)
                    setView('reminders')
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

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const changeMonth = offset => {
        const updatedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
        setCurrentDate(updatedDate)
    }

    const handlePreviousMonthClick = event => {
        event.preventDefault()
        changeMonth(-1)
    }

    const handleNextMonthClick = event => {
        event.preventDefault()
        changeMonth(1)
    }

    const handleCalendarDayClick = selectedDay => {
        const fullSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
        setSelectedDate(fullSelectedDate)
        setSelectedDay(selectedDay)
    }

    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='calendar' />
            <div className='pt-2 flex justify-center items-center'>
                <CalendarButton onClick={handlePreviousMonthClick}>&lt;</CalendarButton>
                <span className='mx-4 text-lg font-semibold'>{`${getMonthName(currentDate)} ${getYear(currentDate)}`}</span>
                <CalendarButton onClick={handleNextMonthClick}>&gt;</CalendarButton>
            </div>
            <div className='grid grid-cols-7 gap-2 bg-white dark:bg-gray-800 p-4 rounded-lg'>
                {/* Days of week */}
                {daysOfWeek.map(day => <div key={day} className='text-center font-bold text-gray-700 dark:text-gray-300 uppercase'>{day}</div>)}
                {/* Empty days */}
                {new Array(getFirstDayWeek(currentDate)).fill(null).map((_, index) => (<div key={`empty-${index}`}></div>))}
                {/* Days of month */}
                {getMonthDays(currentDate).map((day) => {
                    const isToday = new Date().getDate() === day &&
                        new Date().getMonth() === currentDate.getMonth() &&
                        new Date().getFullYear() === currentDate.getFullYear()

                    const isSelected = selectedDay === day
                    const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()
                    const hasReminders = reminders.some(reminder => new Date(reminder.date).toDateString() === currentDayDate)

                    return <div key={day} onClick={() => handleCalendarDayClick(day)}
                        className={`text-center cursor-pointer p-2 rounded-lg transition-all ${isSelected ? 'bg-blue-500 text-white' :
                            isToday ? 'bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-blue-300' :
                                hasReminders ? 'bg-yellow-100 dark:bg-yellow-700 text-yellow-600 dark:text-yellow-300' :
                                    'text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
                    >{day}</div>
                })}
            </div>
            {selectedDate &&
                <div className='flex space-x-4 justify-center px-4 py-2'>
                    <Button onClick={onNewReminderClick}>Add reminder</Button>
                    <Button onClick={onRemindersClick}>See reminders</Button>
                </div>}
        </SectionContainer>
        {selectedDate &&
            <SectionContainer>
                <div ref={createRemindersView}>
                    {view === 'new-reminder' && <CreateReminder
                        date={date}
                        onCreated={onReminderCreated}
                        onCancelClick={onNewReminderClick} />
                    }
                </div>
                <div ref={remindersView}>
                    {view === 'reminders' && <Reminders
                        date={date}
                        onEditClick={onEditClick}
                        onDoneClick={handleDoneClick}
                        onNotRemindersFound={handleReminderDeleted} />
                    }
                </div>
            </SectionContainer>}
    </Main>
}