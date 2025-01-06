import { Main, HomeButton, Span } from './library'
import { SectionHeader, SectionContainer } from './components'
import { useState, useEffect } from 'react'
import useContext from './useContext'
import logic from '../logic'
import { timeAgo } from '../util'
import Loading from './library/Loading'

export default function Home({ onCreateNoteClick, onViewRemindersClick, onCheckTasksClick, onCreateGroupClick, onViewNotesClick, onTasksCreatedClick }) {
    const { alert } = useContext()
    const [name, setName] = useState(null)
    const [tasksCount, setTasksCount] = useState(0)
    const [remindersCount, setRemindersCount] = useState(0)
    const [tasksCreatedCount, setTasksCreatedCount] = useState(0)
    const [lastNote, setLastNote] = useState(null)
    const [notification, setNotification] = useState(null)
    const [teacherNotification, setTeacherNotification] = useState(null)

    const setUserName = (userName) => {
        const name = userName.split(' ')[0]
        setName(name)
    }

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            try {
                {
                    logic.isUserRoleTeacher() && logic.getTasksCreatedCount()
                        .then(tasksCount => {
                            setTasksCreatedCount(tasksCount)
                            setTeacherNotification(`You have ${tasksCount} tasks assigned to students. Keep track of their progress!`)
                        })
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                }
                logic.getRemindersCount()
                    .then(count => { setRemindersCount(count) })
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
                logic.getLastNote()
                    .then(note => { if (note) { setLastNote(note) } else { setLastNote({ text: 'No notes found' }) } })
                    .catch(error => {
                        alert(error.message)
                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        } else {
            setName(null)
            setTasksCount(0)
            setTasksCreatedCount(0)
            setRemindersCount(0)
            setLastNote(null)
        }

    }, [])

    useEffect(() => {
        let intervalId
        const fetchData = () => {
            if (logic.isUserRoleStudent) {
                try {
                    logic.getTasksCount()
                        .then(count => {
                            setTasksCount(count)
                            if (count > 0) {
                                setNotification(`Hey! ${count} tasks are waiting for you. Check them out now.`)
                            } else {
                                setNotification('All tasks reviewed! Keep up the good work.')
                            }
                        })
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)
                    console.error(error)
                }
            }
        }
        fetchData()
        intervalId = setInterval(fetchData, 8000)

        return (() => clearInterval(intervalId))
    }, [])

    if (!lastNote) return <Loading />

    const handleCreateNoteClick = event => { event.preventDefault(), onCreateNoteClick() }
    const handleViewRemindersClick = event => { event.preventDefault(), onViewRemindersClick() }
    const handleCheckTasksClick = event => { event.preventDefault(), onCheckTasksClick() }
    const handleCreateGroupClick = event => { event.preventDefault(), onCreateGroupClick() }
    const handleViewNotesClick = event => { event.preventDefault(), onViewNotesClick() }
    const handleTasksCreatedClick = event => { event.preventDefault(), onTasksCreatedClick() }

    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='studify' loadUserName={setUserName} />
            <div className='p-4 space-y-6'>
                <div className='bg-white dark:bg-gray-800 dark:border-gray-700 shadow border-2 rounded-lg p-4'>
                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-200'>Welcome back, {name}!</h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400 mt-2'>Here's a quick summary of your day:</p>
                    <ul className='mt-4 space-y-2 text-gray-700 dark:text-gray-300'>
                        <li className='flex items-center justify-between text-sm'>
                            <span>Upcoming reminders:</span>
                            <Span level='blue'>{remindersCount}</Span>
                        </li>
                        {logic.isUserRoleStudent() ?
                            <li className='flex items-center justify-between'>
                                <span>Pending tasks:</span>
                                <Span level='red'>{tasksCount}</Span>
                            </li> : <li className='flex items-center justify-between'>
                                <span>Tasks created:</span>
                                <Span level='red'>{tasksCreatedCount}</Span>
                            </li>
                        }
                        <li className='flex items-center justify-between'>
                            <span>Last note:</span>
                            {lastNote && lastNote.text !== 'No notes found' ? <Span>{timeAgo(lastNote.date)} ago</Span> : <Span>No notes available</Span>}
                        </li>
                    </ul>
                </div>
                <div className='grid grid-cols-2 gap-4 text-white'>
                    <HomeButton level='blue' onClick={handleCreateNoteClick}>Create a new note</HomeButton>
                    <HomeButton onClick={handleViewRemindersClick} level='green'>View reminders</HomeButton>
                    {logic.isUserRoleStudent() ?
                        <HomeButton onClick={handleCheckTasksClick} level='yellow'>Check pending tasks</HomeButton> :
                        <HomeButton onClick={handleCreateGroupClick} level='yellow'>Create a new group</HomeButton>
                    }
                    {logic.isUserRoleTeacher() ?
                        <HomeButton onClick={handleTasksCreatedClick} level='red'>View tasks created</HomeButton> :
                        <HomeButton onClick={handleViewNotesClick} level='red'>View notes</HomeButton>
                    }
                </div>
                <div className={`text-center py-4 rounded-lg shadow ${tasksCount > 0 ? 'bg-yellow-100 dark:bg-yellow-900 text-black dark:text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}>
                    {logic.isUserRoleStudent() ? <p className='italic'>{notification}</p> : <p className='italic'>{teacherNotification}</p>}
                </div>
            </div>
        </SectionContainer>
    </Main>
}