import { useState } from 'react'

import { Button } from './library'

import { getFirstDayOfWeek, getMonthDays, getMonthText, getYear } from '../util'

export default function Calendar() {
    const [now, setNow] = useState(new Date())

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

    const changeMonth = offset => {
        const newDate = new Date(now.getFullYear(), now.getMonth() + offset, 1)
        setNow(newDate)
    }

    const handlePreviousMonthClick = event => {
        event.preventDefault()

        changeMonth(-1)
    }

    const handleNextMonthClick = event => {
        event.preventDefault()

        changeMonth(1)
    }

    return <>
        <h2>Calendar</h2>

        {/* months navigator*/}
        <div className="flex justify-center items-center mb-4">
            <Button onClick={handlePreviousMonthClick}>&lt;</Button>
            <span className="p-4">{`${getMonthText(now)} ${getYear(now)}`}</span>
            <Button onClick={handleNextMonthClick}>&gt;</Button>
        </div>

        {/* text days of the week */}
        <div className="grid grid-cols-7 gap-4">
            {daysOfWeek.map(day => {
                return <div className="flex justify-center cursor-pointer" key={day}>{day}</div>
            })}

            {/* empty calendar boxes */}
            {new Array(getFirstDayOfWeek(now)).fill(null).map((_, i) => {
                return <div key={`empty-${i}`}></div>
            })}

            {/* days of the month */}
            {getMonthDays(now).map((day) => {
                return <div className="flex justify-center cursor-pointer" key={day}>{day}</div>
            })}
        </div>
    </>
}