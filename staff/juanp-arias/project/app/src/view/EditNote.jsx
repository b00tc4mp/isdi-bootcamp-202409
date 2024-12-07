import logic from '../logic'
import { SectionContainer, SectionHeader } from './components'
import { Form, Button } from './library'
import useContext from './useContext'

export default function EditNote({ onEdited }) {
    const { alert } = useContext()

    const handleSubmit = (event) => {
        event.preventDefault()
        const { target: form } = event

        const {
            textarea: { value: text },
        } = form

        try {
            logic.createNote(text)
                .then(onCreated)
                .catch((error) => {
                    alert(error.message)
                    console.error(error)
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    return <main className='flex flex-col items-center px-4 py-8 bg-gray-50 min-h-screen'>
        <SectionContainer>
            <SectionHeader sectionName='notes' />
            <Form onSubmit={handleSubmit} className='mt-4 w-full'>
                <div className='m-2'>
                    <textarea
                        id='textarea'
                        placeholder='Write your note here...'
                        className='w-full h-40 p-4  border border-gray-300 bg-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none'
                    ></textarea>
                    <Button type='submit'>Done</Button>
                </div>
            </Form>
        </SectionContainer>
    </main>
}