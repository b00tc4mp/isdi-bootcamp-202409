import logic from '../../logic'
import useContext from '../useContext'
import { formatDate } from '../../util'
import ReminderButton from '../library/ReminderButton'

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
    return <article className='flex items-center justify-between p-4 bg-orange-100 dark:bg-gray-800 rounded-lg shadow-sm border-l-4 border-blue-500 dark:border-blue-400 hover:shadow-md dark:hover:shadow-lg transition'>
        <div>
            <time className='block text-xs text-blue-700 dark:text-blue-300 font-medium mt-2'>{dateCustomized}</time>
            <h4 className='text-base font-semibold text-gray-800 dark:text-gray-200'>{title}</h4>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>{text}</p>
        </div>
        <div className='justify-end ml-2 space-x-1'>
            <ReminderButton onClick={handleDeleteClick}>Delete</ReminderButton>
            <ReminderButton level='blue' onClick={handleEditClick}>Edit</ReminderButton>
        </div>
    </article>
}