import logic from '../../logic'
import { Form, CancelButton, DoneButton, Label, Input, TextareaTask } from '../library'
import useContext from '../useContext'
import { errors } from 'com'

const { SystemError } = errors
export default function CreateTask({ group, onCancelClick, onCreated }) {
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const { textarea: { value: text }, date: { value: date } } = form
        const { id: groupId } = group
        try {
            logic.createTask(groupId, date, text)
                .then(() => {
                    form.reset()
                    alert('Task sent', 'success')
                    onCreated()
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
    }
    const handleCancelClick = event => {
        event.preventDefault()
        onCancelClick()
    }

    return <article className='bg-white rounded-lg shadow-lg p-4 border border-gray-300 w-full hover:bg-gray-100'>
        <h1 className='text-xl font-semibold text-blue-600 mb-1'>New Task</h1>
        <Form onSubmit={handleSubmit} className='space-y-4'>
            <div>
                <Label htmlFor='textarea'>Task Description</Label>
                <TextareaTask id='textarea' placeholder='Write the task details here...'></TextareaTask>
            </div>
            <div>
                <Label htmlFor='date'>Due Date</Label>
                <Input type='date' id='date' />
            </div>
            <div className='flex justify-end space-x-3'>
                <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                <DoneButton type='submit'>Create</DoneButton>
            </div>
        </Form>
    </article>
}