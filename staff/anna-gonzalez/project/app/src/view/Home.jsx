import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logic from '../logic'
import { calculateCyclePhase, calculateDaysUntilNextCycle, calculateDaysUntilNextOvulation, getWeekDayText } from '../util'
import { ButtonSmall } from './library'

export default function Home() {
    const [name, setName] = useState(null)
    const [cyclesStart, setCyclesStart] = useState(null)
    const [cyclePhase, setCyclePhase] = useState(null)
    const [reminder, setReminder] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        if (!logic.isUserLoggedIn()) {
            setName(null)
            setReminder(null)
            setCyclesStart(null)
            setCyclePhase(null)
            return
        }

        if (!name) {
            logic.getUserName()
                .then(response => {
                    setName(response.name)
                })
                .catch(error => {
                    alert(error.message)
                    console.error(error)
                })
        }

        const newDate = new Date()
        newDate.setDate(newDate.getDate() - 1) //yesterday date
        const todayDatePreFormatted = new Date(newDate).toISOString()
        const todayDate = todayDatePreFormatted.split('T')[0]

        logic.getCurrentReminders(todayDate)
            .then(reminders => {
                if (reminders && reminders.length > 0) {
                    setReminder(reminders)
                }
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })

        logic.getCyclesStart()
            .then(pastCyclesStart => {
                setCyclesStart(pastCyclesStart)
            })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
    }, [])

    useEffect(() => {
        if (cyclesStart) {
            const phase = calculateCyclePhase(cyclesStart)
            setCyclePhase(phase)
        }
    }, [cyclesStart])  //recalculate when cyclesStart changes

    const handleGoToCalendarClick = event => {
        event.preventDefault()

        navigate('/calendar')
    }

    const handleGoToDayLogClick = () => {
        const now = new Date().toISOString()

        const todayDate = new Date(now)
        todayDate.setDate(todayDate.getDate() - 1)

        const normalizedTodayDate = new Date(todayDate).toISOString().split('T')[0]

        navigate(`/daylog/${normalizedTodayDate}`)
    }

    const daysUntilNextCycle = cyclesStart ? calculateDaysUntilNextCycle(cyclesStart) : null
    const daysUntilOvulation = cyclesStart ? calculateDaysUntilNextOvulation(cyclesStart) : null

    const isBeforeOvulation = daysUntilOvulation !== null && daysUntilOvulation > 0
    const isOvulationDay = daysUntilOvulation === 0
    const isBeforePeriod = daysUntilNextCycle !== null && daysUntilNextCycle > 0
    const isPeriodDay = daysUntilNextCycle === 0

    const isHighPregnancyChance = daysUntilOvulation <= 3 && daysUntilOvulation >= -3
    const isLowPregnancyChance = daysUntilOvulation > 3 && daysUntilOvulation >= 0 || daysUntilOvulation < -3 && daysUntilNextCycle >= 0

    const now = new Date()

    return <div className="pb-16">
        <div>
            <p>{getWeekDayText()}</p>

            {now.getHours() >= 18 ? (<h2>Good evening, {name}!</h2>)
                : now.getHours() >= 12 ? (<h2>Good afternoon, {name}!</h2>)
                    : now.getHours() >= 6 ? (<h2>Good morning, {name}!</h2>)
                        : (<h2>Good night, {name}!</h2>)}
        </div>

        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-[var(--turquoise-color)] rounded-full w-64 h-64 mt-5 mb-1">
                {!cyclesStart || cyclesStart.length === 0 ? (<><p className="mt-6">First time here?</p><h1>No data</h1></>)
                    : isBeforeOvulation ? (<><p className="mt-6">Ovulation in</p><h1>{daysUntilOvulation} days</h1></>)
                        : isOvulationDay ? (<><p className="mt-6">Today is your day of</p><h1 className="text-5xl mt-5 mb-1">ovulation</h1></>)
                            : isBeforePeriod ? (<><p className="mt-6">Your period starts in</p><h1>{daysUntilNextCycle} days</h1></>)
                                : isPeriodDay ? (<><p className="mt-6">Today starts your</p><h1>period</h1></>)
                                    : (<><p>Your period is late for</p><h1>{-daysUntilNextCycle} days</h1></>)}
                <ButtonSmall onClick={handleGoToCalendarClick}>Go to calendar</ButtonSmall>
            </div>
        </div >

        <div>
            <h3 className="mb-2 mt-5">Your daily insights</h3>

            <div className="flex flex-row gap-4">
                <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                    <h3>Symptoms & activities</h3>
                    <ButtonSmall onClick={handleGoToDayLogClick}>+</ButtonSmall>
                </div >

                <div className="bg-[var(--pink-color)] p-4 rounded-lg flex-1">
                    <p>Chance of getting pregnant</p>
                    {isHighPregnancyChance ? (<h3 className="text-3xl">High</h3>)
                        : isLowPregnancyChance ? (<h3 className="text-3xl">Low</h3>)
                            : (<h3 className="text-3xl">N/A</h3>)
                    }
                </div >
            </div>

            {reminder.length === 1 && (
                <div className="bg-[var(--blue-color)] p-4 rounded-lg mt-4 mb-4">
                    <h3>REMINDER</h3>
                    <p>{reminder[0].title}</p>
                </div>
            )}

            {reminder.length > 1 && (
                <div className="bg-[var(--blue-color)] p-4 rounded-lg mt-4 mb-4">
                    <h3>REMINDERS</h3>
                    {reminder.map((reminderItem, index) => (
                        <p key={index}>{reminderItem.title}</p>
                    ))}
                </div>
            )}
        </div>

        <div>
            <h3 className="mb-2 mt-8">Listen to your body</h3>

            <div className="bg-[var(--yellow-color)] p-4 rounded-lg mt-2 mb-4">
                <h3>CYCLE WEEK</h3>
                {cyclePhase === 'menstruation' ? (<><h2>Menstruation phase</h2><p>Prioritize rest, hydrate, and eat iron-rich foods</p></>)
                    : cyclePhase === 'follicular' ? (<><h2>Follicular phase</h2><p>Plan ahead, exercise, and try new things</p></>)
                        : cyclePhase === 'ovulation' ? (<><h2>Ovulation phase</h2><p>Socialize, focus on communication, and eat protein</p></>)
                            : cyclePhase === 'luteal' ? (<><h2>Luteal phase</h2><p>Simplify tasks, manage stress, and eat magnesium-rich foods</p></>)
                                : (<><h2>Not available</h2><p>Log in your period in the calendar</p></>)}
            </div >
        </div>
    </div>
}