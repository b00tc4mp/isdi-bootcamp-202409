import { useState, useEffect } from 'react'

import logic from '../logic'
import { getHour, getWeekDayText } from '../util'
import { ButtonSmall } from './library'

export default function Home() {
    const [name, setName] = useState(null)
    const [lastCycleStart, setLastCycleStart] = useState(null)
    const weekDay = getWeekDayText()

    //crear getLastPeriodDate ==>
    //crear getCycles
    //crear getLastCycleStartsStart ==> calcular lo que duran los ciclos
    //crear getLastPeriodDate 
    //crear getPeriodEnds ==> calcular lo que duran las reglas

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
        try {
            logic.getLastCycleStart()
                .then(lastCycle => {
                    setLastCycleStart(lastCycle)
                })
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [])

    const handleStartPeriodClick = event => {
        event.preventDefault()

        try {
            logic.createCycle(new Date().toISOString())
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <>
        <div>
            <p>{weekDay}</p>

            {getHour() >= 18 ? (<h2>Good evening, {name}!</h2>)
                : getHour() >= 12 ? (<h2>Good afternoon, {name}!</h2>)
                    : getHour() >= 6 ? (<h2>Good morning, {name}!</h2>)
                        : (<h2>Good night, {name}!</h2>)}
        </div>

        <div className="flex flex-col justify-center items-center mt-6 mb-12">
            <p className="mt-6">Your period starts in</p>
            {lastCycleStart ? <h1>2 days</h1> : <p>Loading...</p>}
            <ButtonSmall onClick={handleStartPeriodClick}>Log in period</ButtonSmall>
        </div>

        <div>
            <h3 className="mb-2">Your daily insights</h3>

            <div className="flex flex-row gap-4">
                <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                    <h3>Symptoms & activities</h3>
                    <ButtonSmall>+</ButtonSmall>
                </div >

                <div className="bg-[var(--pink-color)] p-4 rounded-lg flex-1">
                    <p>Chance of getting pregnant</p>
                    <h3 className="text-3xl">Low</h3>
                </div >
            </div>

            <div className="bg-[var(--Button-color)] p-4 rounded-lg mt-4 mb-4 text-[var(--back-color-light)]">
                <h3>REMINDER</h3>
                <p>Doctor appointment</p>
                <p>7pm</p>
            </div >
        </div>

        <div>
            <h3 className="mb-2">Listen to your body</h3>

            <div className="bg-[var(--yellow-color)] p-4 rounded-lg mt-4 mb-4">
                <h3>WEEK OF YOUR CYCLE</h3>
                <h2>Luteal phase</h2>
                <p>Prioritize self-care.</p>
            </div >
        </div>
    </>
}