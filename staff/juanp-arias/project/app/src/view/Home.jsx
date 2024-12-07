import { Button } from './library'
import { SectionHeader, SectionContainer } from './components'

export default function Home(props) {
    return <main className='flex justify-center items-center min-h-screen bg-gray-100'>
        <SectionContainer>
            <SectionHeader sectionName='studify' />
            <div className='p-6 space-y-4'>
                <Button>Notifications</Button>
                <Button>Schedule</Button>
            </div>
        </SectionContainer>
    </main>
}