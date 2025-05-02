import { useState } from 'react'
import { PrimaryButton } from '../library'
import useContext from '../useContext'

export default function GenderModal({ selectedGenders = [], onGendersChange, onClose }) {
    const { alert } = useContext()

    const [genders, setGenders] = useState(selectedGenders)

    const handleGenderToggle = gender => {
        if (genders.includes(gender)) {
            if (genders.length === 1) {
                alert(null, 'error', 'You must select at least one gender preference')
                return
            }
            const updatedGenders = genders.filter(g => g !== gender)
            setGenders(updatedGenders)
            if (onGendersChange) onGendersChange(updatedGenders)
        } else {
            const updatedGenders = [...genders, gender]
            setGenders(updatedGenders)
            if (onGendersChange) onGendersChange(updatedGenders)
        }
    }

    const handleDoneClick = () => {
        if (onClose) onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="w-full max-w-xs mx-6 p-6 bg-light rounded-xl shadow-xl"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-darkest-blue text-xl font-semibold mb-4">Show Me</h2>

                <div className="space-y-2 text-dark-blue">
                    {['Men', 'Women', 'Nonbinary people'].map(gender => (
                        <div key={gender} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`gender-${gender}`}
                                checked={genders.includes(gender)}
                                onChange={() => handleGenderToggle(gender)}
                                className="h-5 w-5"
                            />
                            <label htmlFor={`gender-${gender}`} className="ml-2">{gender}</label>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-4">
                    <PrimaryButton
                        className="bg-pink" onClick={handleDoneClick}
                    >Done</PrimaryButton>
                </div>
            </div>
        </div>
    )
}