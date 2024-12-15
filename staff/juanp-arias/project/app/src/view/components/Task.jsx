import logic from '../../logic'
import useContext from '../useContext'

export default function Task({ id, text, creatorName, assignes, date, onDeleted, onEditClick }) {
    const { alert, confirm } = useContext()

    const handleDoneClick = () => {
        confirm('Have you finished this task?', accepted => {
            if (accepted) {
                try {
                    logic.deletetask(id)
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
        }, 'warn')
    }
    return <article className='max-w-4xl mx-auto bg-gray-100 shadow rounded-md p-4 border border-gray-300'>
        <div className='flex justify-between items-center'>
            <div>
                <h3 className='text-xl font-bold text-gray-800'>{text}</h3>
                <p className='text-sm text-gray-600 mt-1'>Due date: <span className='font-semibold'>{new Date(date).toLocaleDateString()}</span></p>
            </div>
            <button className='bg-green-500 text-white text-sm px-4 py-2 rounded-md hover:bg-green-600 transition' onClick={handleDoneClick}>Done</button>
        </div>
        <div className='mt-3 text-sm text-gray-700'>
            <span className='font-medium'>Created by: </span>{creatorName}
        </div>
        <div className='mt-3'>
            <p className='text-sm font-semibold text-gray-800'>Assigned to:</p>
            <div className='mt-2 space-y-1 text-xs text-gray-700'>
                {assignes.map(assignee => (
                    <div key={assignee.id}>{assignee.name}</div>
                ))}
            </div>
        </div>
    </article>
}