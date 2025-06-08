import { useState } from 'react'
import { Form, Field, Label, Radio, Checkbox, PrimaryButton } from '../library'
import logic from '../../logic'
import useContext from '../useContext'

export default function GenderStage(props) {
    const { alert } = useContext()

    const genders = ['Man', 'Woman', 'Nonbinary']
    const preferredGenders = ['Men', 'Women', 'Nonbinary people']

    const [selectedGender, setSelectedGender] = useState(null)
    const [targetGenders, setTargetGenders] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleGenderChange = gender => setSelectedGender(gender)

    const handleTargetGenderChange = gender => {
        if (targetGenders.includes(gender)) {
            setTargetGenders(targetGenders.filter(g => g !== gender))
        } else {
            setTargetGenders([...targetGenders, gender])
        }
    }

    const handleSubmit = event => {
        event.preventDefault()

        if (isSubmitting) return

        if (!selectedGender) {
            alert(null, 'error', 'Please select your gender')
            return
        }

        if (targetGenders.length === 0) {
            alert(null, 'warn', 'Please select at least one option')
            return
        }

        setIsSubmitting(true)

        logic.updateUserProfile({ gender: selectedGender, targetGender: targetGenders })
            .then(() => logic.updateUserStage('artists'))
            .then(() => { props.onSetupComplete() })
            .catch(error => {
                alert(error.message)
                console.error(error)
            })
            .finally(() => {
                setIsSubmitting(false)
            })
    }

    return (
        <main className="flex items-center justify-center min-h-full p-10">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-darkest-blue mb-2">
                        Ready to find your tune?
                    </h2>
                    <p className="text-dark-blue">
                        Let's set up your preferences
                    </p>
                </div>

                <Form onSubmit={handleSubmit}>
                    <Field>
                        <Label className="text-lg mb-3">Which gender best describes you?</Label>
                        <div className="space-y-2">
                            {genders.map(gender => (
                                <Radio
                                    key={gender}
                                    id={gender}
                                    name="gender"
                                    value={gender}
                                    checked={selectedGender === gender}
                                    onChange={() => handleGenderChange(gender)}
                                    disabled={isSubmitting}
                                >
                                    {gender}
                                </Radio>
                            ))}
                        </div>
                    </Field>

                    <Field>
                        <Label className="text-lg mb-3">Who would you like to meet?</Label>
                        <div className="space-y-2">
                            {preferredGenders.map(gender => (
                                <Checkbox
                                    key={gender}
                                    id={`target-${gender}`}
                                    value={gender}
                                    checked={targetGenders.includes(gender)}
                                    onChange={() => handleTargetGenderChange(gender)}
                                    disabled={isSubmitting}
                                >
                                    {gender}
                                </Checkbox>
                            ))}
                        </div>
                    </Field>

                    <PrimaryButton
                        className="bg-pink mt-3"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Next
                    </PrimaryButton>
                </Form>
            </div>
        </main>
    )
}