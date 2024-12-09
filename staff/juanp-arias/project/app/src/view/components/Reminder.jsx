import logic from '../../logic'
import useContext from '../useContext'

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

    return <article>
        <h4>{title}</h4>
        <p>{notes}</p>
        <div>
            <time>{date} ago</time>
            <div>
                <button onClick={handleDeleteClick}>Delete</button>
                <button onClick={handleEditClick}>Edit</button>
            </div>
        </div>
    </article>
}