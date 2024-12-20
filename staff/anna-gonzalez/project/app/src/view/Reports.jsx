import { useState, useEffect } from 'react'
import useContext from './useContext'

import { ButtonSmall } from './library'
import { errors } from 'com'

import logic from '../logic'
import { calculateDuration, getFormattedDate, getMostFrequentActivity, getTopSymptoms } from '../util'

const { NotFoundError } = errors

export default function Reports() {
    const { alert } = useContext()

    const [report, setReport] = useState([])
    const [currentCycleIndex, setCurrentCycleIndex] = useState(0)

    useEffect(() => { //used to charge cycles data
        if (logic.isUserLoggedIn()) {
            try {
                logic.getCyclesDetails()
                    .then(reports => {
                        if (reports && reports.length > 0) { //if reports has data...
                            setReport(reports)
                        } else {
                            console.error("No cycles data available")
                        }
                    })
                    .catch(error => {
                        if (error instanceof NotFoundError)
                            alert('Register a cycle to see its Reports')
                        else
                            alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }
    }, [])

    const handlePreviousCycleClick = () => {
        if (currentCycleIndex < report.length - 1) {
            setCurrentCycleIndex(currentCycleIndex + 1)
        }
    }

    const handleNextCycleClick = () => {
        if (currentCycleIndex > 0) {
            setCurrentCycleIndex(currentCycleIndex - 1)
        }
    }

    const currentCycle = report[currentCycleIndex]
    const hasCycleStart = currentCycle && currentCycle.start
    const hasDayLogs = currentCycle && currentCycle.dayLogs.length > 0

    const cycleDuration = hasCycleStart ? calculateDuration(currentCycle.start, currentCycle.end) : null
    const periodDuration = currentCycle && currentCycle.start && currentCycle.periodEnd ? calculateDuration(currentCycle.start, currentCycle.periodEnd) : null

    const topSymptoms = currentCycle && currentCycle.dayLogs ? getTopSymptoms(currentCycle.dayLogs) : []
    const mainMood = currentCycle && currentCycle.dayLogs ? getMostFrequentActivity(currentCycle.dayLogs, 'mood') : null
    const mainFlow = currentCycle && currentCycle.dayLogs ? getMostFrequentActivity(currentCycle.dayLogs, 'flow') : null
    const mainSleep = currentCycle && currentCycle.dayLogs ? getMostFrequentActivity(currentCycle.dayLogs, 'sleep') : null
    const mainSexualEnergy = currentCycle && currentCycle.dayLogs ? getMostFrequentActivity(currentCycle.dayLogs, 'sexualEnergy') : null
    const mainSexualActivity = currentCycle && currentCycle.dayLogs ? getMostFrequentActivity(currentCycle.dayLogs, 'sexualActivity') : null

    return (<div className="pb-20">
        <h2>Reports</h2>

        {hasCycleStart && currentCycle.start && (
            <p><strong>Start:</strong> {getFormattedDate(currentCycle.start)}</p>)}
        {hasCycleStart && currentCycle.end && (
            <p><strong>End:</strong> {getFormattedDate(currentCycle.end)}</p>)}
        {hasCycleStart && !currentCycle.end && (
            <p><strong>End:</strong> Not finished yet</p>)}

        {/* Navigation between cycles */}
        <div className="flex justify-center items-center gap-4 mb-4">
            <ButtonSmall onClick={handlePreviousCycleClick} disabled={currentCycleIndex === 0}>←</ButtonSmall>

            <ButtonSmall onClick={handleNextCycleClick} disabled={currentCycleIndex === report.length - 1}>→</ButtonSmall>
        </div>

        {hasCycleStart ? (
            <div>
                <div className="bg-[var(--turquoise-color)] p-4 rounded-lg mt-4 mb-4">
                    {cycleDuration !== null && (
                        <h3>{Math.round(cycleDuration)} DAYS CYCLE</h3>)}
                    {cycleDuration === null && (
                        <h3>CURRENT CYCLE</h3>)}

                    {periodDuration !== null && (
                        <p><strong>Period Duration:</strong> {Math.round(periodDuration)} days (ended {getFormattedDate(currentCycle.periodEnd)})</p>)}
                    {periodDuration === null && (
                        <p><strong>Period Duration:</strong> Period not ended</p>)}
                </div>

                {hasDayLogs && <div className="flex flex-col flex-wrap gap-4 bg-[var(--grey-color)] p-4 rounded-lg">
                    {currentCycle.dayLogs && currentCycle.dayLogs.length > 0 && (
                        <div><h3>DayLogs</h3><p>Registered: {currentCycle.dayLogs.length}</p></div>)}

                    {topSymptoms.length > 0 && (
                        <div className="mt-4"><h3>Top Symptoms</h3><ul>{topSymptoms.map((symptom, index) => (<li key={index}>{symptom}</li>))}</ul></div>)}

                    <div className="mt-4">
                        {mainMood && <p><strong>Your Mood:</strong> {mainMood}</p>}
                        {mainFlow && <p><strong>Your Flow:</strong> {mainFlow}</p>}
                        {mainSleep && <p><strong>Your Sleep:</strong> {mainSleep}</p>}
                        {mainSexualEnergy && <p><strong>Your Sexual Energy:</strong> {mainSexualEnergy}</p>}
                        {mainSexualActivity && <p><strong>Your Sexual Activity:</strong> {mainSexualActivity}</p>}
                    </div>
                </div>}

                {!hasDayLogs && <div className="flex flex-col flex-wrap gap-4 bg-[var(--grey-color)] p-4 rounded-lg">
                    <p>No dayLogs registered yet</p></div>}

            </div>
        ) : (
            <p>No data available for the current cycle.</p>
        )}
    </div>
    )
}