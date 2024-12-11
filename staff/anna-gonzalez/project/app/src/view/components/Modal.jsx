import { useNavigate } from 'react-router-dom'

import { Button, ButtonSmall } from '../library'
import logic from '../../logic'
import useContext from '../useContext'

export default function Modal({ selectedDate, onCycleCreated, onEndPeriod, onClose }) {
    const { alert } = useContext()

    const navigate = useNavigate()

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

    const handleCreateDayLogClick = () => {
        // const formattedDate = selectedDate.toISOString()
        const formattedDate = selectedDate.toISOString().split('T')[0]

        navigate(`/daylog/${formattedDate}`)
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
                <ButtonSmall onClick={handleCreateDayLogClick}>Log symptoms</ButtonSmall>
                <Button onClick={handleModalClose}>Back</Button>
            </div>
        </div>
    </>
}