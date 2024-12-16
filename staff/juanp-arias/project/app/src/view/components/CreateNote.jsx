import logic from '../../logic'
import { SectionContainer, SectionHeader } from '.'
import { Form, CancelButton, DoneButton, Main, Textarea } from '../library'
import useContext from '../useContext'
import { errors } from 'com'

const { SystemError } = errors
export default function CreateNote({ onCreated, onCancelClick }) {
    const { alert } = useContext()

    const handleSubmit = event => {
        event.preventDefault()
        const { target: form } = event
        const { textarea: { value: text } } = form
        try {
            logic.createNote(text)
                .then(() => {
                    form.reset()
                    alert('Note created', 'success')
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
    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='notes' />
            <Form onSubmit={handleSubmit} className='mt-4 w-full'>
                <div className='m-2'>
                    <Textarea id='textarea' placeholder='Write your note here...'></Textarea>
                    <div className='flex justify-end space-x-2 mr-1'>
                        <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                        <DoneButton type='submit'>Create</DoneButton>
                    </div>
                </div>
            </Form>
        </SectionContainer>
    </Main>
}