import { useState } from 'react'
import logic from '../../logic'
import { TaskButton } from '../library'
import useContext from '../useContext'

export default function Task({ task, creatorName, onDeleted }) {
    const { alert, confirm } = useContext()
    const [isSeen, setIsSeen] = useState(logic.isTaskViewedByUser(task))
    const { id, text, date, assignes, viewed } = task

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
    const handleSeenClick = () => {
        confirm('Do you want to mark this task as seen?', accepted => {
            if (accepted) {
                try {
                    logic.toggleTaskViewed(id)
                        .then(() => { setIsSeen(true) })
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
            }
        }, 'success')
    }
    
    return <article className='max-w-4xl mx-auto bg-gray-100 dark:bg-gray-800 shadow rounded-md p-4 border border-gray-300 dark:border-gray-700'>
        <div className='flex justify-between items-center'>
            <div>
                <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100'>{text}</h3>
                <p className='text-sm text-gray-600 dark:text-gray-300 mt-1'>Due date:{' '}<span className='font-semibold'>{new Date(date).toLocaleDateString()}</span></p>
            </div>
            {logic.isUserRoleStudent() ? <TaskButton onClick={!isSeen ? handleSeenClick : undefined} level={isSeen ? 'seen' : 'green'}>{isSeen ? 'Seen' : 'Mark as Seen'}</TaskButton> : <TaskButton onClick={handleDeleteClick}>Delete</TaskButton>}
        </div>
        <div className='mt-3 text-sm text-gray-700 dark:text-gray-300'>
            <span className='font-medium'>Created by: </span>{creatorName}
        </div>
        {logic.isUserRoleStudent() ? <div className='mt-3'>
            <p className='text-sm font-semibold text-gray-800 dark:text-gray-200'>Assigned to:</p>
            <div className='mt-2 space-y-1 text-xs text-gray-700 dark:text-gray-300'>
                {assignes.map((assignee) => (
                    <div key={assignee.id}>{assignee.name}</div>
                ))}
            </div>
        </div> : <div className='mt-3'>
            <p className='text-sm font-semibold text-gray-800 dark:text-gray-200'>Viewed by:</p>
            <div className='mt-2 space-y-1 text-xs text-gray-700 dark:text-gray-300'>
                {viewed.map((assignee) => (
                    <div key={assignee.id}>{assignee.name}</div>
                ))}
            </div>
        </div>}
    </article>
}