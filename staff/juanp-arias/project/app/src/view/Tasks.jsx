import { useState, useEffect } from 'react'
import { SectionContainer, SectionHeader, Task } from './components'
import { TasksIcon } from './icons'
import logic from '../logic'
import useContext from './useContext'
import { errors } from 'com'
import { Main } from './library'

const { SystemError } = errors
export default function Tasks() {
    const [tasks, setTasks] = useState([])
    const [initiated, setInitiated] = useState(false)
    const { alert } = useContext()

    useEffect(() => {
        try {
            logic.getTasks()
                .then(tasks => {
                    if (tasks.length === 0) {
                        setTasks([])
                    } else {
                        setTasks(tasks)
                    }
                    setInitiated(true)
                })
                .catch(error => {
                    if (error instanceof SystemError) {
                        alert('Sorry, try again later')
                    } else {
                        alert(error.message)
                    }
                    console.error(error)
                    return
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [])
    if (!tasks) return <p>Loading...</p>

    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='tasks' />
            <div className='p-4 space-y-2'>
                {initiated && tasks.length === 0 ? (
                    <div className='text-center py-10'>
                        <p className='text-gray-500 text-lg'>You don't have pending tasks for the upcoming days.</p>
                        <TasksIcon />
                    </div>) : (tasks.map(task => (
                        <Task
                            key={task.id}
                            id={task.id}
                            text={task.text}
                            creatorName={task.creator.name}
                            date={task.date}
                            assignes={task.assignes}
                        />
                    )))}
            </div>
        </SectionContainer>
    </Main>
}