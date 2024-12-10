import { SectionContainer, SectionHeader } from './components'
import { Button } from './library'

export default function Tasks() {
    return <main className='flex flex-col items-center px-6 py-8 bg-gray-50 min-h-screen pb-12'>
        <SectionContainer>
            <SectionHeader sectionName='tasks' />
            <div className='p-6 space-y-4'>
                <Button>New note</Button>
            </div>
        </SectionContainer>
    </main>
}