import { useState, useEffect } from 'react'
import { SectionContainer, SectionHeader, Task } from './components'
import { TasksIcon } from './icons'
import logic from '../logic'
import useContext from './useContext'
import { errors } from 'com'
import { Loading, Main } from './library'

const { SystemError } = errors
export default function Tasks() {
    const [tasks, setTasks] = useState([])
    const { alert } = useContext()

    useEffect(() => {
        let intervalId
        const fetchData = () => {
            try {
                logic.getTasks()
                    .then(tasks => {
                        setTasks(tasks)
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
        }
        fetchData()
        intervalId = setInterval(fetchData, 8000)

        return (() => clearInterval(intervalId))
    }, [])

    if (!tasks) return <Loading />

    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='tasks' />
            <div className='p-4 space-y-2'>
                {tasks.length === 0 ?
                    <div className='text-center py-10'>
                        <p className='text-gray-500 text-lg'>You don't have pending tasks for the upcoming days.</p>
                        <TasksIcon />
                    </div> : tasks.map(task => (
                        <Task
                            key={task.id}
                            task={task}
                            creatorName={task.creator.name}
                        />
                    ))}
            </div>
        </SectionContainer>
    </Main>
}