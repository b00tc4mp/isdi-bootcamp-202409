import { useParams } from 'react-router-dom'

import logic from '../../logic'

import { Button, Input, Label } from '../library'

export default function Reminder({ onCreated }) {
    const { formattedDate } = useParams()

    const normalizedFormattedDate = new Date(formattedDate).toISOString()

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
        {<p>Selected day: {formattedDate}</p>}

        <div>
            <form onSubmit={handleSubmit}>
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" />

                <Button type="submit">Save</Button>
            </form>
        </div>
    </>
}