import { useState, useEffect } from 'react'
import { Button } from './library'
import logic from '../logic'

export default function Reports() {
    const [report, setReport] = useState([])
    const [currentCycleIndex, setCurrentCycleIndex] = useState(0)

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            try {
                logic.getCyclesDetails()
                    .then(reports => {
                        if (reports && reports.length > 0) {
                            setReport(reports)
                        } else {
                            console.error("No cycles data available.")
                        }
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

    const currentCycle = report[currentCycleIndex]
    const hasCycleData = currentCycle && currentCycle.start

    // Calcular la duración del ciclo en días
    const calculateCycleDuration = (startDate, endDate) => {
        if (!startDate || !endDate) return null

        const start = new Date(startDate)
        const end = new Date(endDate)

        // Calcular la diferencia en milisegundos
        const durationInMs = end - start

        // Convertir de milisegundos a días (1000 ms * 60 s * 60 min * 24 hrs)
        const durationInDays = durationInMs / (1000 * 60 * 60 * 24)

        return durationInDays
    }

    const cycleDuration = hasCycleData
        ? calculateCycleDuration(currentCycle.start, currentCycle.end)
        : null

    const periodDuration = currentCycle && currentCycle.start && currentCycle.periodEnd
        ? calculateCycleDuration(currentCycle.start, currentCycle.periodEnd)
        : null

    const handlePrevCycle = () => {
        if (currentCycleIndex < report.length - 1) {
            setCurrentCycleIndex(currentCycleIndex + 1)
        }
    }

    const handleNextCycle = () => {
        if (currentCycleIndex > 0) {
            setCurrentCycleIndex(currentCycleIndex - 1)
        }
    }

    // Función para calcular los tres síntomas más repetidos
    const getTopSymptoms = (dayLogs) => {
        const symptomCount = {}
        dayLogs.forEach(log => {
            if (log.symptoms) {
                log.symptoms.forEach(symptom => {
                    symptomCount[symptom] = (symptomCount[symptom] || 0) + 1
                })
            }
        })

        // Ordenar los síntomas por frecuencia y obtener los 3 más frecuentes
        const sortedSymptoms = Object.entries(symptomCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)

        return sortedSymptoms.map(([symptom]) => symptom)
    }

    // Función para obtener el valor principal de una categoría
    const getMostFrequentValue = (dayLogs, category) => {
        const valueCount = {}
        dayLogs.forEach(log => {
            const value = log[category]
            if (value) {
                valueCount[value] = (valueCount[value] || 0) + 1
            }
        })

        // Ordenar los valores por frecuencia y devolver el más frecuente
        const sortedValues = Object.entries(valueCount)
            .sort(([, a], [, b]) => b - a)

        return sortedValues.length > 0 ? sortedValues[0][0] : null
    }

    // Extraer los síntomas más frecuentes y valores principales
    const topSymptoms = currentCycle && currentCycle.dayLogs ? getTopSymptoms(currentCycle.dayLogs) : []
    const mainMood = currentCycle && currentCycle.dayLogs ? getMostFrequentValue(currentCycle.dayLogs, 'mood') : null
    const mainFlow = currentCycle && currentCycle.dayLogs ? getMostFrequentValue(currentCycle.dayLogs, 'flow') : null
    const mainSleep = currentCycle && currentCycle.dayLogs ? getMostFrequentValue(currentCycle.dayLogs, 'sleep') : null
    const mainSexualEnergy = currentCycle && currentCycle.dayLogs ? getMostFrequentValue(currentCycle.dayLogs, 'sexualEnergy') : null
    const mainSexualActivity = currentCycle && currentCycle.dayLogs ? getMostFrequentValue(currentCycle.dayLogs, 'sexualActivity') : null


    return (
        <>
            <h2>Reports</h2>

            {/* Botones de navegación entre ciclos */}
            <div className="flex justify-center items-center gap-4 mb-4">
                <Button onClick={handlePrevCycle} disabled={currentCycleIndex === 0}>←</Button>

                {/* Mostrar la fecha de inicio del ciclo */}
                {hasCycleData && currentCycle.start && (
                    <p><strong>Start:</strong> {currentCycle.start}</p>
                )}

                {/* Mostrar la fecha de fin del ciclo si existe */}
                {hasCycleData && currentCycle.end && (
                    <p><strong>End:</strong> {currentCycle.end}</p>
                )}

                <Button onClick={handleNextCycle} disabled={currentCycleIndex === report.length - 1}>→</Button>
            </div>

            {hasCycleData ? (
                <div>
                    <div className="bg-[var(--turquoise-color)] p-4 rounded-lg mt-4 mb-4">
                        {/* Mostrar la duración del ciclo en días */}
                        {cycleDuration !== null && (
                            <p><strong>Cycle Duration:</strong> {Math.round(cycleDuration)} days</p>
                        )}
                        {cycleDuration === null && (
                            <p><strong>Cycle Duration:</strong> Cycle not ended</p>
                        )}

                        {/* Mostrar la duración del periodo en días */}
                        {periodDuration !== null && (
                            <p><strong>Period Duration:</strong> {Math.round(periodDuration)} days (ended {currentCycle.periodEnd})</p>
                        )}
                        {periodDuration === null && (
                            <p><strong>Period Duration:</strong> Period not ended</p>
                        )}
                    </div>

                    {/* Mostrar dayLogs si existen */}
                    {currentCycle.dayLogs && currentCycle.dayLogs.length > 0 && (
                        <div>
                            <h3>Daylogs</h3>

                            <p>DayLogs registered: {currentCycle.dayLogs.length}</p>
                        </div>
                    )}

                    {/* Mostrar los síntomas más frecuentes */}
                    {topSymptoms.length > 0 && (
                        <div className="mt-4">
                            <h3>Top 3 Symptoms</h3>
                            <ul>
                                {topSymptoms.map((symptom, index) => (
                                    <li key={index}>{symptom}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Mostrar el valor principal de las categorías */}
                    <div className="mt-4">
                        {mainMood && <p><strong>Most Common Mood:</strong> {mainMood}</p>}
                        {mainFlow && <p><strong>Most Common Flow:</strong> {mainFlow}</p>}
                        {mainSleep && <p><strong>Most Common Sleep:</strong> {mainSleep}</p>}
                        {mainSexualEnergy && <p><strong>Most Common Sexual Energy:</strong> {mainSexualEnergy}</p>}
                        {mainSexualActivity && <p><strong>Most Common Sexual Activity:</strong> {mainSexualActivity}</p>}
                    </div>
                </div>
            ) : (
                <p>No data available for the current cycle.</p>
            )}
        </>
    )
}