import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import logic from '../logic'
import { calculateCyclePhase, calculateDaysUntilNextCycle, calculateDaysUntilNextOvulation, getHour, getWeekDayText } from '../util'
import { ButtonSmall } from './library'

export default function Home() {
    const [name, setName] = useState(null)
    const [cyclesStart, setCyclesStart] = useState(null)
    const [cyclePhase, setCyclePhase] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName()
                        .then(response => {
                            setName(response.name)
                        })
                        .catch(error => {
                            alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
        } else setName(null)
    }, [])

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            try {
                logic.getCyclesStart()
                    .then(pastCyclesStart => {
                        setCyclesStart(pastCyclesStart)
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
    }, [])

    useEffect(() => {
        if (cyclesStart) {
            const phase = calculateCyclePhase(cyclesStart)
            setCyclePhase(phase)
        }
    }, [cyclesStart])

    const handleGoToCalendarClick = event => {
        event.preventDefault()

        navigate('/calendar')
    }

    const handleGoToDayLogClick = event => {
        event.preventDefault()

        navigate('/daylog')
    }

    const daysUntilNextCycle = cyclesStart ? calculateDaysUntilNextCycle(cyclesStart) : null
    const daysUntilOvulation = cyclesStart ? calculateDaysUntilNextOvulation(cyclesStart) : null

    const isBeforeOvulation = daysUntilOvulation !== null && daysUntilOvulation > 0
    const isOvulationDay = daysUntilOvulation === 0
    const isBeforePeriod = daysUntilNextCycle !== null && daysUntilNextCycle > 0
    const isPeriodDay = daysUntilNextCycle === 0

    const isHighPregnancyChance = daysUntilOvulation !== null && daysUntilOvulation <= 3 && daysUntilOvulation >= 0
    const isLowPregnancyChance = daysUntilOvulation !== null && daysUntilOvulation > 3 && (calculateDaysUntilNextCycle(cyclesStart) >= 3 || calculateDaysUntilNextCycle(cyclesStart) === null)

    return <>
        <div>
            <p>{getWeekDayText()}</p>

            {getHour() >= 18 ? (<h2>Good evening, {name}!</h2>)
                : getHour() >= 12 ? (<h2>Good afternoon, {name}!</h2>)
                    : getHour() >= 6 ? (<h2>Good morning, {name}!</h2>)
                        : (<h2>Good night, {name}!</h2>)}
        </div>

        <div className="flex justify-center items-center">
            <div className="flex flex-col justify-center items-center bg-[var(--turquoise-color)] rounded-full w-72 h-72 mt-2 mb-2">
                {!cyclesStart || cyclesStart.length === 0 ? (<><p className="mt-6">Loading predictions...</p><h1>No data</h1></>)
                    : isBeforeOvulation ? (<><p className="mt-6">Ovulation in</p><h1>{daysUntilOvulation} days</h1></>)
                        : isOvulationDay ? (<><p className="mt-6">Today is your</p><h1>Ovulation day</h1></>)
                            : isBeforePeriod ? (<><p className="mt-6">Your period starts in</p><h1>{daysUntilNextCycle} days</h1></>)
                                : isPeriodDay ? (<><p className="mt-6">Today starts your</p><h1>period</h1></>)
                                    : (<><p>Your period is late for</p><h1>{-daysUntilNextCycle} days</h1></>)}
                <ButtonSmall onClick={handleGoToCalendarClick}>Go to calendar</ButtonSmall>
            </div>
        </div >

        <div>
            <h3 className="mb-2">Your daily insights</h3>

            <div className="flex flex-row gap-4">
                <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                    <h3>Symptoms & activities</h3>
                    <ButtonSmall onClick={handleGoToDayLogClick}>+</ButtonSmall>
                </div >

                <div className="bg-[var(--pink-color)] p-4 rounded-lg flex-1">
                    <p>Chance of getting pregnant</p>
                    {isHighPregnancyChance ? (<h3 className="text-3xl">High</h3>)
                        : isLowPregnancyChance ? (<h3 className="text-3xl">Low</h3>)
                            : (<h3 className="text-3xl">Not defined</h3>)
                    }
                </div >
            </div>

            <div className="bg-[var(--blue-color)] p-4 rounded-lg mt-4 mb-4">
                <h3>REMINDER</h3>
                <p>Doctor appointment</p>
                <p>7pm</p>
            </div >
        </div>

        <div>
            <h3 className="mb-2">Listen to your body</h3>

            <div className="bg-[var(--yellow-color)] p-4 rounded-lg mt-4 mb-4">
                <h3>WEEK OF YOUR CYCLE</h3>
                {cyclePhase === 'menstruation' ? (<><h2>Menstruation phase</h2><p>Prioritize rest, hydrate, and eat iron-rich foods</p></>)
                    : cyclePhase === 'follicular' ? (<><h2>Follicular phase</h2><p>Plan ahead, exercise, and try new things</p></>)
                        : cyclePhase === 'ovulation' ? (<><h2>Ovulation phase</h2><p>Socialize, focus on communication, and eat protein</p></>)
                            : cyclePhase === 'luteal' ? (<><h2>Luteal phase</h2><p>Simplify tasks, manage stress, and eat magnesium-rich foods</p></>)
                                : (<><h2>No cycles registered yet</h2><p>Log in your period in the calendar</p></>)}
            </div >
        </div>
    </>
}