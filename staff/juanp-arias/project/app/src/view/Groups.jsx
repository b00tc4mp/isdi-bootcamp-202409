import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SectionContainer, SectionHeader, Group, CreateGroup } from './components'
import { Button } from './library'
import logic from '../logic'
import useContext from './useContext'
import { errors } from 'com'

const { SystemError } = errors
export default function Groups() {
    const [groups, setGroups] = useState([])
    const [view, setView] = useState(null)
    const { alert } = useContext()
    const navigate = useNavigate()

    // useEffect(() => {
    //     try {
    //         logic.getGroups()
    //             .then(groups => {
    //                 setGroups(groups)
    //             })
    //             .catch(error => {
    //                 if (error instanceof SystemError)
    //                     alert('Sorry, try again later')
    //                 else
    //                     alert(error.message)
    //                 console.error(error)
    //                 return
    //             })
    //     } catch (error) {
    //         alert(error.message)
    //         console.error(error)
    //     }
    // }, [])

    const onCreateGroupClick = () => {
        setView(view ? null : 'create-group')
    }

    const handleCancelClick = () => {
        setView(null)
    }

    return <main className='flex flex-col items-center px-6 py-8 bg-gray-50 min-h-screen pb-14'>
        <SectionContainer>
            <SectionHeader sectionName='groups' />
            {/* <div className='grid grid-cols-2 gap-4 p-6'>
                {initiated && groups.map((group) => (
                    <Group onEditClick={onEditClick} key={group.id} group={group} onDeleted={handleDeleted} />
                ))}
            </div> */}
            <div className='p-6 space-y-4'>
                <Button>Assing task</Button>
                <Button onClick={onCreateGroupClick}>Create group</Button>
            </div>
            {view === 'create-group' && <CreateGroup onCancelClick={handleCancelClick} />}
        </SectionContainer>
    </main>
}