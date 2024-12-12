import { Button, Main } from './library'
import { SectionHeader, SectionContainer } from './components'

export default function Home(props) {
    return <Main>
        <SectionContainer>
            <SectionHeader sectionName='studify' />
            <div className='p-6 space-y-4'>
                <Button>Notifications</Button>
                <Button>Schedule</Button>
            </div>
        </SectionContainer>
    </Main>
}