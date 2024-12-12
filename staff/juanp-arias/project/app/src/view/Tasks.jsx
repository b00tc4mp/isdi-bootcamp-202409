import { SectionContainer, SectionHeader } from './components'
import { Button, Main } from './library'

export default function Tasks() {
    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='tasks' />
            <div className='p-6 space-y-4'>
                <Button>New note</Button>
            </div>
        </SectionContainer>
    </Main>
}