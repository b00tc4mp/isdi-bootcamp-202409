import logic from '../../logic'
import { SectionContainer, SectionHeader } from '.'
import { Form, CancelButton, DoneButton, Main } from '../library'
import useContext from '../useContext'

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
            <SectionHeader sectionName='notes' />
            <Form onSubmit={handleSubmit} className='mt-4 w-full'>
                <div className='m-2'>
                    <textarea
                        id='textarea'
                        placeholder='Write your note here...'
                        className='w-full h-60 p-4  border border-gray-300 bg-gray-100 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none'
                    ></textarea>
                    <div className='flex justify-end space-x-2 mr-1'>
                        <CancelButton onClick={handleCancelClick}>Cancel</CancelButton>
                        <DoneButton type='submit'>Create</DoneButton>
                    </div>
                </div>
            </Form>
        </SectionContainer>
    </Main>
}
