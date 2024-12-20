import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { SectionContainer, SectionHeader } from '.'
import { Form, CancelButton, DoneButton, Field, Label, Input, Main, Loading } from '../library'
import { errors } from 'com'
import logic from '../../logic'
import useContext from '../useContext'

const { SystemError } = errors
export default function EditReminder({ onCancelClick, onEdited }) {
    const [reminder, setReminder] = useState(null)
    const { alert } = useContext()
    const { reminderId } = useParams()

    useEffect(() => {
        try {
            logic.editReminder(reminderId)
                .then(reminderData => {
                    setReminder(reminderData)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)
                    console.error(error)
                    return
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [reminderId])

    if (!reminder) return <Loading />

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const { title: { value: title }, text: { value: text }, date: { value: date } } = form
        try {
            logic.updateReminder(reminderId, title, text, date)
                .then(onEdited)
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

    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='reminder' />
            <Form onSubmit={handleSubmit} className='space-y-4 flex flex-col mx-4 mt-2'>
                <Field>
                    <Label htmlFor='title'>Title</Label>
                    <Input id='title' defaultValue={reminder.title}></Input>
                </Field>
                <Field >
                    <Label htmlFor='text'>Notes</Label>
                    <Input id='text' defaultValue={reminder.text}></Input>
                </Field>
                <Field >
                    <Label htmlFor='date'>Date</Label>
                    <Input id='date' defaultValue={reminder.date} />
                </Field>
                <Field >
                    <Label htmlFor='date'>Priority</Label>
                </Field>
                <div className='flex justify-end space-x-2 mr-1'>
                    <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                    <DoneButton type='submit'>Done</DoneButton>
                </div>
            </Form>
        </SectionContainer>
    </Main>
}