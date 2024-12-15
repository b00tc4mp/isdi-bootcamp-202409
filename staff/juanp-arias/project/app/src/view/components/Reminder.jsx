import logic from '../../logic'
import useContext from '../useContext'
import { formatDate } from '../../util'

export default function Reminder({ dateReminder, onDeleted, onEditClick }) {
    const { alert, confirm } = useContext()
    const { id, title, text, date } = dateReminder

    const handleDeleteClick = () => {
        confirm('Delete reminder?', accepted => {
            if (accepted) {
                try {
                    logic.deleteReminder(id)
                        .then(onDeleted)
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
            }
        })
    }

    const handleEditClick = () => { onEditClick(dateReminder.id) }
    const dateCustomized = formatDate(date)
    return <article className='flex items-center justify-between p-4 bg-orange-100 rounded-lg shadow-sm border-l-4 border-blue-500 hover:shadow-md transition'>
        <div>
            <time className='block text-xs text-blue-700 font-medium mt-2'>{dateCustomized}</time>
            <h4 className='text-base font-semibold text-gray-800'>{title}</h4>
            <p className='text-sm text-gray-600 mt-1'>{text}</p>
        </div>
        <div className='justify-end ml-2 space-x-1'>
            <button onClick={handleDeleteClick} className='text-xs text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition'>Delete</button>
            <button onClick={handleEditClick} className='text-xs text-white bg-blue-500 px-3 py-1 rounded-md hover:bg-blue-600 transition'>Edit</button>
        </div>
    </article>
}