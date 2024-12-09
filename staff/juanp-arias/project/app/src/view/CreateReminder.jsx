import { Button, Form, Input, Field, Label } from './library'
import { SectionHeader } from './components'
import useContext from './useContext'
import logic from '../logic'

export default function CreateReminder({ date, onCreated, onCancelClick }) {
    const { alert } = useContext()
    console.log(date)

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const { title: { value: title }, text: { value: text }, date: { value: date } } = form
        try {
            logic.createReminder(title, text, date)
                .then(() => {
                    form.reset()
                    alert('Reminder created', 'success')
                    onCreated()
                })
                .catch((error) => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleCancelClick = event => {
        event.preventDefault()
        onCancelClick()
    }
    return <main>
        <SectionHeader sectionName='reminders' />
        <div className='bg-white p-4'>
            <Form onSubmit={handleSubmit} className='space-y-4 flex flex-col'>
                <Field>
                    <Label htmlFor='title'>Title</Label>
                    <Input id='title'></Input>
                </Field>
                <Field >
                    <Label htmlFor='text'>Notes</Label>
                    <Input id='text'></Input>
                </Field>
                <Field >
                    <Label htmlFor='date'>Date</Label>
                    <Input id='date' defaultValue={date} />
                </Field>
                <Field >
                    <Label htmlFor='date'>Priority</Label>

                </Field>
                <div className='flex justify-end space-x-4 mt-4'>
                    <Button onClick={handleCancelClick}>Cancel</Button>
                    <Button type='submit'>Done</Button>
                </div>
            </Form>
        </div>
    </main>
}