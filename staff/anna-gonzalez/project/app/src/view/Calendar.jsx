import { useState, useEffect } from 'react'

import { Modal } from './components'
import { ButtonSmall } from './library'

import logic from '../logic'
import { getFirstDayOfWeek, getMonthDays, getMonthText, getYear } from '../util'

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date()) //current calendar date
    const [selectedDate, setSelectedDate] = useState(null) //full selected date on calendar
    const [selectedDay, setSelectedDay] = useState(null) //selected day on calendar
    const [periodDays, setPeriodDays] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false) //modal visibility

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            try {
                logic.getPeriodDays()
                    .then(periodDays => {
                        setPeriodDays(periodDays)
                    })
                    .catch(error => {
                        alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }
    }, [isModalOpen])

    const changeMonth = offset => {
        const updatedDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1) //offset = movement

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
        setIsModalOpen(true)
    }

    const handleStartPeriod = () => { setIsModalOpen(false) }
    const handleEndPeriod = () => { setIsModalOpen(false) }
    const handleDeleteCycle = () => { setIsModalOpen(false) }
    const handleModalClose = () => { setIsModalOpen(false) }

    const weekDaysText = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    return <>
        <h2>Calendar</h2>

        {!isModalOpen && (
            <>
                {/* months navigator*/}
                < div className="flex justify-center items-center mb-4">
                    <ButtonSmall onClick={handlePreviousMonthClick}>&lt;</ButtonSmall>
                    <span className="px-4 w-28 text-center font-bold mt-0">{`${getMonthText(currentDate)} ${getYear(currentDate)}`}</span>
                    <ButtonSmall onClick={handleNextMonthClick}>&gt;</ButtonSmall>
                </div >

                {/* header with days of the week */}
                <div className="grid grid-cols-7 gap-3 px-1">
                    {weekDaysText.map(day => {
                        return <div className="flex justify-center text-xs" key={day}>{day}</div>
                    })}

                    {/* empty calendar boxes*/}
                    {new Array(getFirstDayOfWeek(currentDate)).fill(null).map((_, index) => { //_ is the current value of the element, and index is the index in the array
                        return <div key={`empty-${index}`}></div>
                    })}

                    {/* days of the month */}
                    {getMonthDays(currentDate).map((selectedDay) => {
                        const isPeriodDay = periodDays.includes(new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay).toISOString())

                        return <div onClick={() => handleCalendarDayClick(selectedDay)} key={selectedDay} className={`flex justify-center cursor-pointer ${isPeriodDay ? 'bg-[var(--pink-color)] rounded-full' : ''}`} >{selectedDay}</div>
                    })}
                </div >
            </>
        )}

        {isModalOpen && <Modal selectedDate={selectedDate} selectedDay={selectedDay} onCycleCreated={handleStartPeriod} onCycleDeleted={handleDeleteCycle} onEndPeriod={handleEndPeriod} onClose={handleModalClose} />}
    </>
}