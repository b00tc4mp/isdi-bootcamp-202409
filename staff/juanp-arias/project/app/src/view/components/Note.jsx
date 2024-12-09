import logic from '../../logic'
import { timeAgo } from '../../util'
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

    return <article className='bg-gray-100 p-4 rounded-md shadow-md border border-gray-200 flex flex-col'>
        <h4 className='font-bold text-gray-700 mb-2'>{author.username}</h4>
        <p className='text-sm text-gray-600 mb-2'>{text.length > 100 ? `${text.substring(0, 100)}...` : text}</p>
        <div className='mt-auto'>
            <time className='text-xs text-gray-400 block mb-2'>{timeAgo(date)} ago</time>
            <div className='space-x-1'>
                <button onClick={handleDeleteClick} className='text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-600 transition'>Delete</button>
                <button onClick={handleEditClick} className='text-sm text-white bg-yellow-500 px-3 py-1 rounded-md hover:bg-yellow-600 transition'>Edit</button>
            </div>
        </div>
    </article>
}