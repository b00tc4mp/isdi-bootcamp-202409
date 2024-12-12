import { Button, Form, Field, Label, Checkbox, Radio } from '../library'
import logic from '../../logic'
import { errors } from 'com'
import useContext from '../useContext'
import { useState } from 'react'

const { SystemError } = errors

export default function GenderStage(props) {
    console.log('GenderStage -> render')

    const { alert } = useContext()

    const genders = ['Man', 'Woman', 'Nonbinary']
    const preferredGenders = ['Men', 'Women', 'Nonbinary people']

    const [selectedGender, setSelectedGender] = useState(null)
    const [targetGenders, setTargetGenders] = useState([])

    const handleGenderChange = gender => setSelectedGender(gender)

    const handleTargetGenderChange = gender => {
        if (targetGenders.includes(gender))
            // Updates the targetGenders state with the new array, effectively "unchecking" the checkbox for this gender
            setTargetGenders(targetGenders.filter(g => g !== gender)) // ensures the gender being removed is excluded from the new array
        else
            setTargetGenders([...targetGenders, gender]) // creates a new array with the added gender (immutability -> important in React)
    }

    const handleSubmit = event => {
        event.preventDefault()

        if (!selectedGender) {
            alert('Please select your gender')

            return
        }

        if (targetGenders.length === 0) {
            alert('Please select at least one option')

            return
        }

        logic.updateUser({ gender: selectedGender, targetGender: targetGenders })
            .then(() => logic.updateUserStage('artists'))
            .then(() => {
                props.onSetupComplete()
            })
            .catch(error => {
                if (error instanceof SystemError)
                    alert('Sorry, try again later.')
                else
                    alert(error.message)

                console.error(error)
            })
    }

    return (
        <main className="justify-self-center">
            {/* Posar nom més endavant */}
            <h2>Ready to find your tune?</h2>

            <Form onSubmit={handleSubmit}>
                <Field>
                    <Label>Which gender best describes you?</Label>
                    {genders.map(gender => (
                        <Radio
                            key={gender}
                            id={gender}
                            name="gender"
                            value={gender}
                            checked={selectedGender === gender}
                            onChange={() => handleGenderChange(gender)}
                        >
                            {gender}
                        </Radio>
                    ))}
                </Field>

                <Field>
                    <Label>Who would you like to meet?</Label>
                    {preferredGenders.map(gender => (
                        <Checkbox
                            key={gender}
                            id={`target-${gender}`}
                            value={gender}
                            checked={targetGenders.includes(gender)}
                            onChange={() => handleTargetGenderChange(gender)}
                        >
                            {gender}
                        </Checkbox>
                    ))}
                </Field>

                <Button type="submit">Next</Button>
            </Form>
        </main>
    )
}