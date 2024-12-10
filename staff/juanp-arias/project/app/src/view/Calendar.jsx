import { useState } from 'react'
import { SectionHeader, SectionContainer } from './components'
import { CalendarButton, Button } from './library'
import { getFirstDayWeek, getMonthDays, getMonthName, getYear } from '../logic/calendar/index.js'
import CreateReminder from './CreateReminder.jsx'
import Reminders from './Reminders.jsx'

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedDay, setSelectedDay] = useState(null)
    const [view, setView] = useState(null)

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const changeMonth = (offset) => {
        const updatedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
        setCurrentDate(updatedDate)
    }

    const handlePreviousMonthClick = (event) => {
        event.preventDefault()
        changeMonth(-1)
    }

    const handleNextMonthClick = (event) => {
        event.preventDefault()
        changeMonth(1)
    }

    const handleCalendarDayClick = (selectedDay) => {
        const fullSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)
        setSelectedDate(fullSelectedDate)
        setSelectedDay(selectedDay)
    }

    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay)

    const onNewReminderClick = () => {
        setView(view ? null : 'new-reminder')
    }
    const onRemindersClick = () => {
        setView(view ? null : 'reminders')
    }

    const handleReminderCreated = () => {
        setView('reminders')
    }
    const handleCancelClick = () => {
        setView(null)
    }
    const handleAcceptedClick = () => {
        setView('new-reminder')
    }

    return <main className='flex flex-col items-center px-6 py-8 bg-gray-50 min-h-screen pb-14'>
        <SectionContainer>
            <SectionHeader sectionName='calendar' />
            <div className='pt-2 flex justify-center items-center'>
                <CalendarButton onClick={handlePreviousMonthClick}>&lt;</CalendarButton>
                <span className='mx-4 text-lg font-semibold'>{`${getMonthName(currentDate)} ${getYear(currentDate)}`}</span>
                <CalendarButton onClick={handleNextMonthClick}>&gt;</CalendarButton>
            </div>
            <div className='grid grid-cols-7 gap-2 bg-white p-4 rounded-lg'>
                {/* Days of week */}
                {daysOfWeek.map((day) => (
                    <div key={day} className='text-center font-bold text-gray-700 uppercase'>{day}</div>))}

                {/* Empty days */}
                {new Array(getFirstDayWeek(currentDate)).fill(null).map((_, index) => (<div key={`empty-${index}`}></div>))}

                {/* Days of month */}
                {getMonthDays(currentDate).map((day) => {
                    const isToday = new Date().getDate() === day && new Date().getMonth() === currentDate.getMonth() && new Date().getFullYear() === currentDate.getFullYear()

                    const isSelected = selectedDay === day

                    return <div key={day} onClick={() => handleCalendarDayClick(day)} className={`text-center cursor-pointer p-2 rounded-lg transition-all ${isSelected ? 'bg-blue-500 text-white' : isToday ? 'bg-blue-100 text-blue-600' : 'text-gray-800 hover:bg-gray-200'}`}>{day}</div>
                })}
            </div>
            {selectedDate &&
                <div className='flex space-x-4 justify-center px-4 py-2'>
                    <Button onClick={onNewReminderClick}>Add reminder</Button>
                    <Button onClick={onRemindersClick}>See reminders</Button>
                </div>
            }
        </SectionContainer>
        {selectedDate &&
            <SectionContainer>
                {view === 'new-reminder' && <CreateReminder date={date} onCreated={handleReminderCreated} onCancelClick={handleCancelClick} />}
                {view === 'reminders' && <Reminders date={date} onCreated={handleReminderCreated} onCancelClick={handleCancelClick} onAcceptedClick={handleAcceptedClick} />}
            </SectionContainer>
        }
    </main >
}
