import { useState, useEffect } from 'react'
import { SectionContainer, SectionHeader, Group, CreateGroup } from './components'
import { Button, Main } from './library'
import logic from '../logic'
import useContext from './useContext'
import { errors } from 'com'

const { SystemError } = errors
export default function Groups() {
    const [groups, setGroups] = useState([])
    const [initiated, setInitiated] = useState(false)
    const [view, setView] = useState(null)
    const { alert } = useContext()

    useEffect(() => {
        try {
            logic.getGroups()
                .then(groups => {
                    setGroups(groups)
                    setInitiated(true)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)
                    console.error(error)
                    return
                })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }, [])

    const onCreateGroupClick = () => {
        setView(view ? null : 'create-group')
    }

    const handleCancelClick = () => {
        setView(null)
    }

    const handleGroupCreated = () => {
        setView(null)
    }

    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='groups' />
            <div className='grid grid-cols-2 gap-4 p-6'>
                {initiated && groups.map((group) => (
                    <Group key={group.id} group={group} />
                ))}
            </div>
            <div className='p-4 space-y-4'>
                <Button>Assing task</Button>
                <Button onClick={onCreateGroupClick}>Create group</Button>
            </div>
            {view === 'create-group' && <CreateGroup onCancelClick={handleCancelClick} onCreated={handleGroupCreated} />}
        </SectionContainer>
    </Main>
}