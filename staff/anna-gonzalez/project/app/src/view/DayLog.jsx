import { useState } from 'react'

import logic from '../logic'
import { getMonthAndDayText } from '../util'

import { Button } from './library'

export default function DayLog() {
    const [formData, setFormData] = useState({ symptoms: [], mood: '', energy: '', flow: '', sleep: '', sexualActivity: '', sexualEnergy: '' })

    const handleCheckboxChange = event => {
        const { name } = event.target
        setFormData((prev) => {
            const updatedSymptoms = prev.symptoms.includes(name)
                ? prev.symptoms.filter((symptom) => symptom !== name) //remove if already selected
                : [...prev.symptoms, name] //add if not selected

            return { ...prev, symptoms: updatedSymptoms }
        })
    }

    const handleRadioChange = event => {
        const { name, value } = event.target
        setFormData((prev) => ({
            ...prev,
            [name]: value, //update the corresponding field
        }))
    }

    const handleSubmit = event => {
        event.preventDefault()

        try {
            logic.createDayLog(date)
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <>
        <h2>DayLog</h2>
        <p className="mb-8">{getMonthAndDayText()}</p>

        <form>
            <fieldset className="mt-4 flex flex-wrap gap-4">
                <legend>SYMPTOMS</legend>
                {["fatigue", "headache", "cramps", "tenderBreasts", "acne", "backache", "cravings", "abdominalPain", "dryness"]
                    .map((symptom) => (
                        <div key={symptom}>
                            <input type="checkbox" id={symptom} name={symptom} onChange={handleCheckboxChange} />
                            <label htmlFor={symptom}>{symptom.charAt(0).toUpperCase() + symptom.slice(1)}</label>
                        </div>
                    )
                    )}
            </fieldset>

            {[
                { legend: "MOOD", name: "mood", options: ["calm", "happy", "moodSwings", "sad", "anxious"] },
                { legend: "ENERGY", name: "energy", options: ["lowEnergy", "moderateEnergy", "highEnergy"] },
                { legend: "FLOW", name: "flow", options: ["noDischarge", "creamy", "watery"] },
                { legend: "SLEEP", name: "sleep", options: ["poorSleep", "averageSleep", "goodSleep"] },
                { legend: "SEXUAL ACTIVITY", name: "sexualActivity", options: ["noSex", "sex"] },
                { legend: "SEXUAL ENERGY", name: "sexualEnergy", options: ["lowSexEnergy", "moderateSexEnergy", "highSexEnergy"] },
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

            <Button onSubmit={handleSubmit} type="submit">Save</Button>
        </form>
    </>
}