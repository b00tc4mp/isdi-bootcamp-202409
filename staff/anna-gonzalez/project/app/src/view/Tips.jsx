import { useState, useEffect } from 'react'

import logic from '../logic'
import { calculateCyclePhase } from '../util'

export default function Tips() {
    const [cyclesStart, setCyclesStart] = useState(null)
    const [cyclePhase, setCyclePhase] = useState(null)
    const [tips, setTips] = useState({ music: null, selfCare: null, nutrition: null, exercise: null })

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
                logic.getTips(phase)
                    .then(tips => {
                        const newTips = {
                            music: tips[0].description,
                            selfCare: tips[1].description,
                            nutrition: tips[2].description,
                            exercise: tips[3].description
                        }

                        setTips(newTips)
                    })
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
            }
        }
    }, [cyclesStart])

    return <div className="pb-20">
        <h2>Tips</h2>

        <div className="bg-[var(--yellow-color)] p-4 rounded-lg mt-4 mb-4">
            <h3>CYCLE WEEK</h3>

            {cyclePhase === 'menstruation' ? (<><h2>Menstruation phase</h2><p>Prioritize rest, hydrate, and eat iron-rich foods</p></>)
                : cyclePhase === 'follicular' ? (<><h2>Follicular phase</h2><p>Plan ahead, exercise, and try new things</p></>)
                    : cyclePhase === 'ovulation' ? (<><h2>Ovulation phase</h2><p>Socialize, focus on communication, and eat protein</p></>)
                        : cyclePhase === 'luteal' ? (<><h2>Luteal phase</h2><p>Simplify tasks, manage stress, and eat magnesium-rich foods</p></>)
                            : (<><h2>No cycles registered yet</h2><p>Log in your period in the calendar</p></>)}
        </div >

        {tips.music !== null &&
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                    <h3>NUTRITION</h3>
                    <p>{tips.nutrition}</p>
                </div>

                <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                    <h3>EXERCISE</h3>
                    <p>{tips.exercise}</p>
                </div>

                <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                    <h3>SELF-CARE</h3>
                    <p>{tips.selfCare}</p>
                </div>

                <div className="bg-[var(--grey-color)] p-4 rounded-lg flex-1">
                    <h3>MUSIC</h3>
                    <p>{tips.music}</p>
                </div>
            </div>
        }
    </div>
}