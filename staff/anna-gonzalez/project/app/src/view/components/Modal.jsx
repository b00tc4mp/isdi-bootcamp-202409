import { Button, ButtonSmall } from '../library'
import logic from '../../logic'

export default function Modal({ selectedDate, onCycleCreated, onEndPeriod, onClose }) {
    const handleStartPeriodClick = event => {
        event.preventDefault()

        try {
            logic.createCycle(selectedDate.toISOString())
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

    const handleEndPeriodClick = event => {
        event.preventDefault()

        try {
            logic.addPeriodEnd(selectedDate.toISOString())
                .then(onEndPeriod)
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
                <p>Selected day: {selectedDate.toISOString()}</p>
                <ButtonSmall onClick={handleStartPeriodClick}>Start period</ButtonSmall>
                <ButtonSmall onClick={handleEndPeriodClick}>End period</ButtonSmall>
                <ButtonSmall>Add event</ButtonSmall>
                <ButtonSmall>Log symptoms</ButtonSmall>
                <Button onClick={handleModalClose}>Back</Button>
            </div>
        </div>
    </>
}