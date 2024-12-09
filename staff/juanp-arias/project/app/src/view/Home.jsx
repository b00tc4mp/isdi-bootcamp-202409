import { Button } from './library'
import { SectionHeader, SectionContainer } from './components'

export default function Home(props) {
    return <main className='flex flex-col items-center px-6 py-8 bg-gray-50 min-h-screen pb-12'>
        <SectionContainer>
            <SectionHeader sectionName='studify' />
            <div className='p-6 space-y-4'>
                <Button>Notifications</Button>
                <Button>Schedule</Button>
            </div>
        </SectionContainer>
    </main>
}