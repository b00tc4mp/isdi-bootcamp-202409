import logic from '../../logic'
import useContext from '../useContext'
import { useState, useEffect, useRef } from 'react'
import { DeleteButton, EditButton } from '../library'
import { CreateTask } from './index.js'

export default function Group({ group, onDeleted }) {
    const { name, teacher, students } = group
    const [buttons, setButtons] = useState(false)
    const { confirm } = useContext()
    const [view, setView] = useState(null)
    const createTaskView = useRef(null)

    useEffect(() => {
        if (view === 'new-task' && createTaskView.current) {
            createTaskView.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    })

    const handleDeleteGroup = () => {
        confirm('Delete group?', accepted => {
            if (accepted) {
                try {
                    logic.deleteGroup(group.id)
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

    const handleAssignTask = () => { setView(view ? null : 'new-task') }

    const handleGroupClick = () => {
        setButtons(!buttons)
        setView(null)
    }

    return <article>
        <div className='border border-gray-300 dark:border-gray-600 rounded-lg shadow-md p-4 hover:bg-blue-100 dark:hover:bg-blue-800 cursor-pointer bg-white dark:bg-gray-800' onClick={handleGroupClick}>
            <h4 className='text-xl font-bold text-blue-600 dark:text-blue-300 mb-4'>{name}</h4>
            <h5 className='text-md font-semibold text-gray-700 dark:text-gray-400 mb-4'>Teacher: {teacher.name}</h5>
            <div className='mt-4'>
                <h6 className='text-sm font-bold text-gray-600 dark:text-gray-400 mb-2'>Students:</h6>
                <ul className='list-disc list-inside space-y-2'>
                    {students.map((student) => (
                        <li key={student.id} className='text-sm text-gray-800 dark:text-gray-300 flex justify-between items-center'>
                            <span>{student.name}</span>
                            <span className='text-xs font-medium text-gray-500 dark:text-gray-400'>{student.role}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        {buttons &&
            <div className='flex mt-1 space-x-2 justify-center'>
                <EditButton onClick={handleAssignTask}>Assign Task</EditButton>
                <DeleteButton onClick={handleDeleteGroup}>Delete Group</DeleteButton>
            </div>
        }
        {view === 'new-task' &&
            <div className='flex mt-1 space-x-2 justify-center' ref={createTaskView}>
                <CreateTask onCancelClick={handleAssignTask} group={group} onCreated={handleGroupClick} />
            </div>
        }
    </article>
}