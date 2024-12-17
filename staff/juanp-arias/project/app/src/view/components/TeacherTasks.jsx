import { useState, useEffect } from 'react'
import { SectionContainer, SectionHeader, Task } from './index.js'
import { TasksIcon } from '../icons'
import logic from '../../logic/index.js'
import useContext from '../useContext.js'
import { errors } from 'com'
import { Loading, Main } from '../library'

const { SystemError } = errors
export default function TeacherTasks() {
    const [tasks, setTasks] = useState([])
    const { alert } = useContext()

    useEffect(() => {
        try {
            logic.getTasksCreated()
                .then(tasks => {
                    if (tasks.length === 0) { setTasks([]) } else { setTasks(tasks) }
                })
                .catch(error => {
                    if (error instanceof SystemError) { alert('Sorry, try again later') } else { alert(error.message) }
                    console.error(error)
                    return
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [])

    if (!tasks) return <Loading />

    const handleTaskDelete = () => {
        try {
            logic.getTasksCreated()
                .then(tasks => {
                    if (tasks.length === 0) { setTasks([]) } else { setTasks(tasks) }
                })
                .catch(error => {
                    if (error instanceof SystemError) { alert('Sorry, try again later') } else { alert(error.message) }
                    console.error(error)
                    return
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='tasks created' />
            <div className='p-4 space-y-2'>
                {tasks.length === 0 ?
                    <div className='text-center py-10'>
                        <p className='text-gray-500 dark:text-gray-400 text-lg'>You don't have tasks created for the upcoming days.</p>
                        <TasksIcon />
                    </div> : tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            creatorName={task.creator.name}
                            onDeleted={handleTaskDelete}
                        />
                    ))}
            </div>
        </SectionContainer>
    </Main>
}