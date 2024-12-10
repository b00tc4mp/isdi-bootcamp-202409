import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import logic from '../logic'

import { Button } from './library'

export default function DayLog({ onCreated }) {
    const { formattedDate } = useParams()

    const [dayLog, setDayLog] = useState(null)
    const [formData, setFormData] = useState({ symptoms: [], mood: '', flow: '', sleep: '', sexualActivity: '', sexualEnergy: '' })

    //create variable for mood etc lo q sta map

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            try {
                logic.getCurrentDayLog(formattedDate)
                    .then(currentDayLog => {
                        console.log(currentDayLog)
                        setDayLog(currentDayLog)
                        setFormData(prevFormData => {
                            let updatedSymptoms = currentDayLog.symptoms || prevFormData.symptoms
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
                    })
                    .catch(error => {
                        alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error
            }
        }
    }, [])

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
            const sentDate = new Date(formattedDate).toISOString()

            Object.keys(formData).forEach(key => {
                if (formData[key] === '') delete formData[key]
            })

            logic.createDayLog(sentDate, formData)
                .then(onCreated)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
            //add alert('Day log saved successfully')!!!!!!
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <>
        <h2>DayLog</h2>

        <form>
            <p className="mb-8">{formattedDate}</p>

            <fieldset className="mt-4 flex flex-wrap gap-4">
                <legend>SYMPTOMS</legend>
                {['fatigue', 'headache', 'cramps', 'tender breasts', 'acne', 'backache', 'cravings', 'abdominal pain', 'dryness']
                    .map((symptom) => (
                        <div key={symptom}>
                            <input type="checkbox" id={symptom} name={symptom} onChange={handleCheckboxChange} />
                            <label htmlFor={symptom}>{symptom.charAt(0).toUpperCase() + symptom.slice(1)}</label>
                        </div>
                    )
                    )}
            </fieldset>

            {[
                { legend: 'MOOD', name: 'mood', options: ['calm', 'energetic', 'happy', 'mood swings', 'sad', 'apathetic', 'anxious'] },
                { legend: 'FLOW', name: 'flow', options: ['no discharge', 'creamy', 'watery'] },
                { legend: 'SLEEP', name: 'sleep', options: ['poor', 'average', 'good'] },
                { legend: 'SEXUAL ACTIVITY', name: 'sexualActivity', options: ['no sex', 'sex'] },
                { legend: 'SEXUAL ENERGY', name: 'sexualEnergy', options: ['low', 'moderate', 'high'] },
            ].map(({ legend, name, options }) => (
                <fieldset key={name} className="mt-4 flex flex-wrap gap-4">
                    <legend>{legend}</legend>
                    {options.map((option) => (
                        <div key={option}>
                            <input type="radio" id={option} name={name} value={option} onChange={handleRadioChange} />
                            <label htmlFor={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</label>
                        </div>
                    ))}
                </fieldset>
            ))}

            <Button className="mb-12" onClick={handleSubmit} type="submit">Save</Button>
        </form>
    </>
}