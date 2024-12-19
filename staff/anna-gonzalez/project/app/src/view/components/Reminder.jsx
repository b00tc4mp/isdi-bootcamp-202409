import { useParams } from 'react-router-dom'

import logic from '../../logic'

import { Button, Form, Input, Label } from '../library'
import useContext from '../useContext'
import { getFormattedDate } from '../../util'

export default function Reminder({ onCreated }) {
    const { formattedDate } = useParams()

    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const { target: form } = event

        const {
            title: { value: title }
        } = form

        try {
            logic.createReminder(formattedDate, title)
                .then(onCreated)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    return <>
        <h2>Reminder</h2>
        {<p><strong>Selected day: </strong>{getFormattedDate(formattedDate)}</p>}

        <div className="mt-6 flex flex-col">
            <Form onSubmit={handleSubmit}>
                <Label htmlFor="title">Title </Label>
                <Input type="text" id="title" />

                <Button type="submit">Save</Button>
            </Form>
        </div>
    </>
}