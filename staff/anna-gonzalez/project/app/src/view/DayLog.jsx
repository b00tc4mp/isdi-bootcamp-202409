import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useContext from './useContext'

import logic from '../logic'
const { NotFoundError } = errors

import { Button } from './library'
import { getFormattedDate } from '../util'
import { errors } from 'com'

export default function DayLog({ onCreated }) {
    const { formattedDate } = useParams()

    const { alert } = useContext()

    const [formData, setFormData] = useState({ symptoms: [], mood: '', flow: '', sleep: '', sexualActivity: '', sexualEnergy: '' })
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            try {
                logic.getCurrentDayLog(formattedDate)
                    .then(currentDayLog => {
                        if (currentDayLog) {
                            setFormData(prevFormData => {
                                let updatedSymptoms = currentDayLog.symptoms ? currentDayLog.symptoms : prevFormData.symptoms
                                let updatedMood = currentDayLog.mood ? currentDayLog.mood : prevFormData.mood
                                let updatedFlow = currentDayLog.flow ? currentDayLog.flow : prevFormData.flow
                                let updatedSleep = currentDayLog.sleep ? currentDayLog.sleep : prevFormData.sleep
                                let updatedSexualActivity = currentDayLog.sexualActivity ? currentDayLog.sexualActivity : prevFormData.sexualActivity
                                let updatedSexualEnergy = currentDayLog.sexualEnergy ? currentDayLog.sexualEnergy : prevFormData.sexualEnergy

                                return {
                                    symptoms: updatedSymptoms,
                                    mood: updatedMood,
                                    flow: updatedFlow,
                                    sleep: updatedSleep,
                                    sexualActivity: updatedSexualActivity,
                                    sexualEnergy: updatedSexualEnergy
                                }
                            })
                        } else {
                            console.log('DayLog for this date not found')
                        }
                        setIsLoaded(true)
                    })
                    .catch(error => {
                        if (error instanceof NotFoundError)
                            alert('Register a cycle to create a DayLog')
                        else
                            alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error
            }
        }
    }, [formattedDate])

    const handleCheckboxChange = event => {
        const { name } = event.target

        setFormData(prev => {
            const updatedSymptoms = prev.symptoms.includes(name)
                ? prev.symptoms.filter(symptom => symptom !== name) //remove if already selected
                : [...prev.symptoms, name] //add if not selected

            return {
                ...prev, //copy properties from last state
                symptoms: updatedSymptoms //rewrites symptoms
            }
        })
    }

    const handleRadioChange = event => {
        const { name, value } = event.target

        setFormData(prev => {
            return {
                ...prev, //copy properties from last state
                [name]: value //rewrites or add property with name being value of "name"
            }
        })
    }

    const handleSubmit = event => {
        event.preventDefault()

        try {
            Object.keys(formData).forEach(key => {
                if (formData[key] === '') delete formData[key]
            })

            logic.createDayLog(formattedDate, formData)
                .then(onCreated)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const symtomsOptions = ['fatigue', 'headache', 'cramps', 'tender breasts', 'acne', 'backache', 'cravings', 'abdominal pain', 'dryness']

    const activitiesOptions = [
        { legend: 'Mood', name: 'mood', options: ['calm', 'energetic', 'happy', 'mood swings', 'sad', 'apathetic', 'anxious'] },
        { legend: 'Flow', name: 'flow', options: ['no discharge', 'creamy', 'watery'] },
        { legend: 'Sleep', name: 'sleep', options: ['poor', 'average', 'good'] },
        { legend: 'Sexual activity', name: 'sexualActivity', options: ['no sex', 'sex'] },
        { legend: 'Sexual energy', name: 'sexualEnergy', options: ['low', 'moderate', 'high'] },
    ]

    if (!isLoaded) {
        return <p>Loading...</p>
    }

    return <div className="pb-20">
        <h2>DayLog</h2>

        <form>
            <p className="mb-8"><strong>Selected day: </strong>{getFormattedDate(formattedDate)}</p>

            <fieldset className="mt-4 flex flex-wrap gap-4">
                <legend className="text-lg mb-2 font-bold">Symptoms</legend>
                {symtomsOptions.map((symptom) => (
                    <div key={symptom} className="flex items-center">
                        <input type="checkbox" id={symptom} name={symptom} onChange={handleCheckboxChange} checked={formData.symptoms.includes(symptom)} className="hidden peer" />
                        <label htmlFor={symptom} className="cursor-pointer py-1 px-4 rounded-full bg-gray-200 hover:bg-gray-300 peer-checked:bg-[var(--pink-color)]">{symptom.charAt(0).toUpperCase() + symptom.slice(1)}</label>
                    </div>
                )
                )}
            </fieldset>

            {activitiesOptions.map(({ legend, name, options }) => (
                <fieldset key={name} className="mt-4 flex flex-wrap gap-4">
                    <legend className="text-lg mb-2 font-bold">{legend}</legend>
                    {options.map((option) => (
                        <div key={option} className="flex items-center">
                            <input type="radio" id={option} name={name} value={option} onChange={handleRadioChange} checked={formData[name] === option} className="hidden peer" />
                            <label htmlFor={option} className="cursor-pointer py-1 px-4 rounded-full bg-gray-200 hover:bg-gray-300 peer-checked:bg-[var(--pink-color)]">{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                        </div>
                    ))}
                </fieldset>
            ))}

            <Button className="mb-12" onClick={handleSubmit} type="submit">Save</Button>
        </form>
    </div>
}