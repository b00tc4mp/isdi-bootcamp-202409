import logic from '../../logic'
import { timeAgo } from '../../util'
import { DeleteButton, EditButton } from '../library'
import useContext from '../useContext'

export default function Note({ note, onDeleted, onEditClick }) {
    const { alert, confirm } = useContext()
    const { id, author, date, text } = note

    const handleDeleteClick = () => {
        confirm('Delete note?', accepted => {
            if (accepted) {
                try {
                    logic.deleteNote(id)
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
        onEditClick(note.id)
    }

    return <article className='bg-gray-100 dark:bg-gray-800 p-4 rounded-md shadow-md border border-gray-200 dark:border-gray-700 flex flex-col'>
        <h4 className='font-bold text-gray-700 dark:text-gray-200 mb-2'>{author.username}</h4>
        <p className='text-sm text-gray-600 dark:text-gray-300 mb-2'>
            {text.length > 100 ? `${text.substring(0, 100)}...` : text}
        </p>
        <div className='mt-auto'>
            <time className='text-xs text-gray-400 dark:text-gray-500 block mb-2'>{timeAgo(date)} ago</time>
            <div className='space-x-1'>
                <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
                <EditButton onClick={handleEditClick}>Edit</EditButton>
            </div>
        </div>
    </article>
}