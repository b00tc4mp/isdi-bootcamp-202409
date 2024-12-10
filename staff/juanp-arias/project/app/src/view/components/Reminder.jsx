import logic from '../../logic'
import useContext from '../useContext'
import { formatDate } from '../../util'

export default function Reminder({ reminder, onDeleted, onEditClick }) {
    const { alert, confirm } = useContext()
    const { id, title, notes, date } = reminder

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
    const handleEditClick = () => {
        onEditClick(reminder.id)
    }

    const dateCustomized = formatDate(date)
    return <article>
        <h4>{title}</h4>
        <p>{notes}</p>
        <div>
            <time>{dateCustomized}</time>
            <div className='space-x-1'>
                <button onClick={handleDeleteClick} className='text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition'>Delete</button>
                <button onClick={handleEditClick} className='text-sm text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-600 transition'>Edit</button>
            </div>
        </div>
    </article>
}