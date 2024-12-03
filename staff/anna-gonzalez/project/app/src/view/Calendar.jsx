import { useState } from 'react'

import { Modal } from './components'
import { Button } from './library'

import { getFirstDayOfWeek, getMonthDays, getMonthText, getYear } from '../util'

export default function Calendar() {
    const [currentDate, setcurrentDate] = useState(new Date()) //current calendar date
    const [selectedDate, setSelectedDate] = useState(null) //full selected date on calendar
    const [selectedDay, setSelectedDay] = useState(null) //selected day on calendar
    const [isModalOpen, setIsModalOpen] = useState(false) //modal visibility

    const weekDaysText = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const changeMonth = offset => {
        const updatedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1) //offset = movement

        setcurrentDate(updatedDate)
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
        const fullSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay + 1)

        setSelectedDate(fullSelectedDate)
        setSelectedDay(selectedDay)
        setIsModalOpen(true)
    }

    const handleStartPeriod = () => {
        setIsModalOpen(false)
    }

    const handleEndPeriod = () => {
        setIsModalOpen(false)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    return <>
        <h2>Calendar</h2>

        {!isModalOpen && (
            <>
                {/* months navigator*/}
                < div className="flex justify-center items-center mb-4">
                    <Button onClick={handlePreviousMonthClick}>&lt;</Button>
                    <span className="p-4">{`${getMonthText(currentDate)} ${getYear(currentDate)}`}</span>
                    <Button onClick={handleNextMonthClick}>&gt;</Button>
                </div >

                {/* header with days of the week */}
                <div className="grid grid-cols-7 gap-4">
                    {weekDaysText.map(day => {
                        return <div className="flex justify-center cursor-pointer" key={day}>{day}</div>
                    })}

                    {/* empty calendar boxes*/}
                    {new Array(getFirstDayOfWeek(currentDate)).fill(null).map((_, index) => {
                        return <div key={`empty-${index}`}></div>
                    })}

                    {/* days of the month */}
                    {getMonthDays(currentDate).map((selectedDay) => {
                        return <div onClick={() => handleCalendarDayClick(selectedDay)} key={selectedDay} className="flex justify-center cursor-pointer" >{selectedDay}</div>
                    })}
                </div >
            </>
        )}

        {isModalOpen && <Modal selectedDate={selectedDate} selectedDay={selectedDay} onCycleCreated={handleStartPeriod} onEndPeriod={handleEndPeriod} onClose={handleModalClose} />}
    </>
}