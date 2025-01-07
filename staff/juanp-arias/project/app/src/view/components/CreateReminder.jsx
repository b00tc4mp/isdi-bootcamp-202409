import { CancelButton, Form, Input, Field, Label, DoneButton } from '../library'
import { SectionHeader } from '.'
import useContext from '../useContext'
import logic from '../../logic'
import { errors } from 'com'

const { SystemError } = errors
export default function CreateReminder({ date, onCreated, onCancelClick }) {
    const { alert } = useContext()

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
                .catch(error => {
                    if (error instanceof SystemError) {
                        alert('Cannot create reminders for past dates')
                        onCancelClick()
                    } else {
                        alert(error.message)
                        console.error(error)
                        return
                    }
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

    const formatedDate = new Date(date).toDateString()
    return <main>
        <SectionHeader sectionName='new-reminder' />
        <div className='bg-white dark:bg-gray-800 p-4'>
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
                    <Input defaultValue={formatedDate} disabled />
                    <Input id='date' type='hidden' defaultValue={date} disabled />
                </Field>
                <div className='flex justify-end space-x-2 mr-1'>
                    <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                    <DoneButton type='submit'>Create</DoneButton>
                </div>
            </Form>
        </div>
    </main>
}