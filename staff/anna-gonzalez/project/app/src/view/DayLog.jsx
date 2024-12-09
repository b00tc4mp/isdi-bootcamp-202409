import { useState } from 'react'
import { useParams } from 'react-router-dom'

import logic from '../logic'
import { getMonthAndDayText } from '../util'

import { Button } from './library'

export default function DayLog() {
    const { formattedDate } = useParams()

    const [formData, setFormData] = useState({ symptoms: [], mood: '', energy: '', flow: '', sleep: '', sexualActivity: '', sexualEnergy: '' })

    /*add a useEffect executed to get Day logs
    import { useEffect, useState } from 'react';
import logic from '../logic'; // Ajusta la importación según tu estructura

export default function DayLog() {
    const { formattedDate } = useParams();
    const [formData, setFormData] = useState({ symptoms: [], mood: '', energy: '', flow: '', sleep: '', sexualActivity: '', sexualEnergy: '' });

    useEffect(() => {
        const fetchDayLog = async () => {
            try {
                const fetchedData = await logic.getDayLog(formattedDate);
                if (fetchedData) {
                    // Aquí, podrías ajustar la forma de los datos si es necesario
                    const { symptoms, ...rest } = fetchedData;
                    setFormData({
                        ...rest,
                        symptoms: symptoms ? symptoms.split(',') : [], // Convertir a array si es necesario
                    });
                }
            } catch (error) {
                console.error('Error fetching day log:', error);
            }
        };

        fetchDayLog();
    }, [formattedDate]); // Dependencia para que se ejecute cuando cambie `formattedDate`

    // El resto del código de tu componente, incluyendo el formulario y `handleSubmit`...
}*/


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
        const { name, value } = event.target;

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

            const formattedData = { ...formData, symptoms: formData.symptoms.join(','), }

            Object.keys(formattedData).forEach(key => {
                if (formattedData[key] === '') delete formattedData[key]
            })

            logic.createDayLog(sentDate, formattedData)
                .then()
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
            <p className="mb-8">{getMonthAndDayText(formattedDate)}</p>

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
                { legend: 'MOOD', name: 'mood', options: ['calm', 'happy', 'mood swings', 'sad', 'anxious'] },
                { legend: 'ENERGY', name: 'energy', options: ['low', 'moderate', 'high'] },
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