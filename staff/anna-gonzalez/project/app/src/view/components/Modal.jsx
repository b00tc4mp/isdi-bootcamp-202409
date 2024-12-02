import { Button, ButtonSmall } from '../library'
import logic from '../../logic'

export default function Modal({ selectedDay, now, onClose, onCycleCreated }) {
    const handleStartPeriod = event => {
        event.preventDefault()

        try {
            logic.createCycle(now)
                .then(onCycleCreated)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleModalClose = () => {
        onClose()
    }

    return <>
        <div>
            <div>
                <p>Selected day: {selectedDay}</p>
                <ButtonSmall onClick={handleStartPeriod}>Start period</ButtonSmall>
                <ButtonSmall>End period</ButtonSmall>
                <ButtonSmall>Add event</ButtonSmall>
                <ButtonSmall>Log symptoms</ButtonSmall>
                <Button onClick={handleModalClose}>Back</Button>
            </div>
        </div>
    </>
}