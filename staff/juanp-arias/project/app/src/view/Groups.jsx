import { useState, useEffect, useRef } from 'react'
import { SectionContainer, SectionHeader, Group, CreateGroup } from './components'
import { Button, Loading, Main } from './library'
import logic from '../logic'
import useContext from './useContext'
import { errors } from 'com'

const { SystemError } = errors
export default function Groups() {
    const [groups, setGroups] = useState([])
    const [initiated, setInitiated] = useState(false)
    const [view, setView] = useState(null)
    const { alert } = useContext()
    const createGroupView = useRef(null)

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

    useEffect(() => {
        if (view && createGroupView.current) { createGroupView.current.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
    }, [view])

    if (!groups) return <Loading />

    const handleDeleted = () => {
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
    }

    const onCreateGroupClick = () => { setView(view ? null : 'create-group') }
    const handleCancelClick = () => { setView(null) }

    const handleGroupCreated = () => {
        try {
            logic.getGroups()
                .then(groups => {
                    setGroups(groups)
                    setInitiated(true)
                    setView(null)
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
    }
    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='groups' />
            <div className='grid grid-cols-2 gap-4 p-6'>
                {initiated && groups.map(group => <Group key={group.id} group={group} onDeleted={handleDeleted} />)}
            </div>
            <div className='p-4'>
                <Button onClick={onCreateGroupClick}>Create group</Button>
            </div>
        </SectionContainer>
        {view === 'create-group' && <SectionContainer>
            <div ref={createGroupView}>
                <CreateGroup onCancelClick={handleCancelClick} onCreated={handleGroupCreated} />
            </div>
        </SectionContainer>}
    </Main>
}