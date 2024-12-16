import logic from '../../logic'
import { TaskButton } from '../library'
import useContext from '../useContext'

export default function Task({ task, creatorName, onDeleted }) {
    const { alert, confirm } = useContext()
    const { id, text, date, assignes } = task

    const handleDeleteClick = () => {
        confirm('Delete this tasks?', accepted => {
            if (accepted) {
                try {
                    logic.deleteTask(id)
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

    return <article className='max-w-4xl mx-auto bg-gray-100 shadow rounded-md p-4 border border-gray-300'>
        <div className='flex justify-between items-center'>
            <div>
                <h3 className='text-xl font-bold text-gray-800'>{text}</h3>
                <p className='text-sm text-gray-600 mt-1'>Due date: <span className='font-semibold'>{new Date(date).toLocaleDateString()}</span></p>
            </div>
            {logic.isUserRoleStudent() ? <TaskButton level='green'>Done</TaskButton> : <TaskButton onClick={handleDeleteClick}>Delete</TaskButton>}
        </div>
        <div className='mt-3 text-sm text-gray-700'>
            <span className='font-medium'>Created by: </span>{creatorName}
        </div>
        <div className='mt-3'>
            <p className='text-sm font-semibold text-gray-800'>Assigned to:</p>
            <div className='mt-2 space-y-1 text-xs text-gray-700'>
                {assignes.map(assignee => (
                    <div key={assignee._id}>{assignee.name}</div>
                ))}
            </div>
        </div>
    </article>
}