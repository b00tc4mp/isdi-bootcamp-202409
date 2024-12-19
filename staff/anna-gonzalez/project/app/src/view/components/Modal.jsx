import { useNavigate } from 'react-router-dom'

import { Button, ButtonSmall } from '../library'
import { getFormattedDate } from '../../util'
import logic from '../../logic'
import useContext from '../useContext'

export default function Modal({ selectedDate, onCycleCreated, onCycleDeleted, onEndPeriod, onClose }) {
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

    const handleDeleteCycleClick = event => {
        event.preventDefault()

        try {
            const start = selectedDate.toISOString().split('T')[0]

            logic.deleteCycle(start)
                .then(onCycleDeleted)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleAddReminderClick = event => {
        event.preventDefault()

        const formattedDate = selectedDate.toISOString().split('T')[0]

        navigate(`/reminder/${formattedDate}`)
    }

    const handleCreateDayLogClick = () => {
        const formattedDate = selectedDate.toISOString().split('T')[0]

        navigate(`/daylog/${formattedDate}`)
    }

    const handleModalClose = () => { onClose() }

    return <>
        <div>
            <div>
                <p><strong>Selected day: </strong>{getFormattedDate(selectedDate.toISOString())}</p>
                <ButtonSmall onClick={handleStartPeriodClick}>Start period</ButtonSmall>
                <ButtonSmall onClick={handleEndPeriodClick}>End period</ButtonSmall>
                <ButtonSmall onClick={handleDeleteCycleClick}>Delete cycle</ButtonSmall>
                <ButtonSmall onClick={handleAddReminderClick}>Add reminder</ButtonSmall>
                <ButtonSmall onClick={handleCreateDayLogClick}>Log symptoms</ButtonSmall>
                <Button onClick={handleModalClose}>Back</Button>
            </div>
        </div>
    </>
}