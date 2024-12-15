import { Main } from './library'
import { SectionHeader, SectionContainer } from './components'
import { useState, useEffect } from 'react'
import useContext from './useContext'
import logic from '../logic'
import { timeAgo } from '../util'
import { errors } from 'com'

const { SystemError } = errors
export default function Home({ onCreateNoteClick, onViewRemindersClick, onCheckTasksClick, onCreateGroupClick }) {
    const { alert } = useContext()
    const [name, setName] = useState(null)
    const [tasksCount, setTasksCount] = useState(0)
    const [remindersCount, setRemindersCount] = useState(0)
    const [lastNote, setLastNote] = useState(null)

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name) {
                try {
                    logic.getUserName()
                        .then(name => {
                            const firstName = name.split(" ")[0]
                            setName(firstName)
                        })
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                    logic.getTasksCount()
                        .then(count => { setTasksCount(count) })
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                    logic.getRemindersCount()
                        .then(count => { setRemindersCount(count) })
                        .catch(error => {
                            alert(error.message)
                            console.error(error)
                        })
                    logic.getLastNote()
                        .then(note => {
                            if (note) { setLastNote(note) } else { setLastNote({ text: 'No notes found' }) }
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
        } else {
            setName(null)
            setTasksCount(0)
            setRemindersCount(0)
            setLastNote(null)
        }
    }, [])

    if (!lastNote) return <p>Loading...</p>

    const handleCreateNoteClick = event => { event.preventDefault(), onCreateNoteClick() }
    const handleViewRemindersClick = event => { event.preventDefault(), onViewRemindersClick() }
    const handleCheckTasksClick = event => { event.preventDefault(), onCheckTasksClick() }
    const handleCreateGroupClick = event => { event.preventDefault(), onCreateGroupClick() }
    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='studify' />
            <div className='p-4 space-y-6'>
                <div className='bg-white shadow rounded-lg p-4'>
                    <h3 className='text-xl font-bold text-gray-800'>Welcome back, {name}!</h3>
                    <p className='text-sm text-gray-600 mt-2'>Here's a quick summary of your day:</p>
                    <ul className='mt-4 space-y-2 text-gray-700'>
                        <li className='flex items-center justify-between text-sm'>
                            <span>Upcoming reminders:</span>
                            <span className='text-blue-500 font-semibold'>{remindersCount}</span>
                        </li>
                        <li className='flex items-center justify-between'>
                            <span>Pending tasks:</span>
                            <span className='text-red-500 font-semibold'>{tasksCount}</span>
                        </li>
                        <li className='flex items-center justify-between'>
                            <span>Last note:</span>
                            {lastNote && lastNote.text !== 'No notes found' ? <span className="text-gray-500 font-medium">{timeAgo(lastNote.date)} ago</span> : <span className="text-gray-500 font-medium">No notes available</span>
                            }
                        </li>
                    </ul>
                </div>
                <div className='grid grid-cols-2 gap-4 text-white'>
                    <button onClick={handleCreateNoteClick} className='bg-blue-500 py-3 rounded-lg shadow hover:bg-blue-600'>Create a new note</button>
                    <button onClick={handleViewRemindersClick} className='bg-green-500 py-3 rounded-lg shadow hover:bg-green-600'>View reminders</button>
                    {logic.isUserRoleStudent() ? (<button onClick={handleCheckTasksClick} className='bg-yellow-500 py-3 rounded-lg shadow hover:bg-yellow-600'>Check pending tasks</button>) : (<button onClick={handleCreateGroupClick} className='bg-yellow-500 py-3 rounded-lg shadow hover:bg-yellow-600'>Create a new group</button>)}
                    <button className='bg-red-500 py-3 rounded-lg shadow hover:bg-red-600'>View schedule</button>
                </div>
                <div className='text-center bg-gray-100 py-4 rounded-lg shadow'>
                    <p className='text-gray-600 italic'>'The secret of getting ahead is getting started.' - Mark Twain</p>
                </div>
            </div>
        </SectionContainer>
    </Main>
}