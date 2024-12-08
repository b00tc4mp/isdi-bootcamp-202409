import { useState, useEffect } from 'react'

import logic from '../logic'
import { calculateCyclePhase } from '../util'

export default function Tips() {
    const [cyclesStart, setCyclesStart] = useState(null)
    const [cyclePhase, setCyclePhase] = useState(null)
    const [exerciseTips, setExerciseTips] = useState(null)
    const [musicTips, setMusicTips] = useState(null)
    const [nutritionTips, setNutritionTips] = useState(null)
    const [selfCareTips, setSelfCareTips] = useState(null)

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

            if (phase) {
                logic.getExerciseTips(phase)
                    .then(exerciseTips => setExerciseTips(exerciseTips))
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
            }
        }
    }, [cyclesStart])

    useEffect(() => {
        if (cyclesStart) {
            const phase = calculateCyclePhase(cyclesStart)
            setCyclePhase(phase)

            if (phase) {
                logic.getMusicTips(phase)
                    .then(musicTips => setMusicTips(musicTips))
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
            }
        }
    }, [cyclesStart])

    useEffect(() => {
        if (cyclesStart) {
            const phase = calculateCyclePhase(cyclesStart)
            setCyclePhase(phase)

            if (phase) {
                logic.getNutritionTips(phase)
                    .then(nutritionTips => setNutritionTips(nutritionTips))
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
            }
        }
    }, [cyclesStart])

    useEffect(() => {
        if (cyclesStart) {
            const phase = calculateCyclePhase(cyclesStart)
            setCyclePhase(phase)

            if (phase) {
                logic.getSelfCareTips(phase)
                    .then(selfCareTips => setSelfCareTips(selfCareTips))
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
            }
        }
    }, [cyclesStart])

    return <>
        <h2>Tips</h2>

        <div className="bg-[var(--yellow-color)] p-4 rounded-lg mt-4 mb-4">
            <h3>WEEK OF YOUR CYCLE</h3>

            {cyclePhase === 'menstruation' ? (<><h2>Menstruation phase</h2><p>Prioritize rest, hydrate, and eat iron-rich foods</p></>)
                : cyclePhase === 'follicular' ? (<><h2>Follicular phase</h2><p>Plan ahead, exercise, and try new things</p></>)
                    : cyclePhase === 'ovulation' ? (<><h2>Ovulation phase</h2><p>Socialize, focus on communication, and eat protei.</p></>)
                        : cyclePhase === 'luteal' ? (<><h2>Luteal phase</h2><p>Simplify tasks, manage stress, and eat magnesium-rich foods</p></>)
                            : (<><h2>No cycles registered yet</h2><p>Log in your period in the calendar</p></>)}
        </div >

        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                <h3>NUTRITION</h3>
                <p>{nutritionTips || 'Loading nutrition tips...'}</p>
            </div >

            <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                <h3>EXERCISE</h3>
                <p>{exerciseTips || 'Loading nutrition tips...'}</p>
            </div >

            <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                <h3>SELF-CARE</h3>
                <p>{selfCareTips || 'Loading nutrition tips...'}</p>
            </div >

            <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                <h3>MUSIC</h3>
                <p>{musicTips || 'Loading nutrition tips...'}</p>
            </div >
        </div>
    </>
}