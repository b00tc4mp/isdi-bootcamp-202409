import { SectionContainer, SectionHeader } from './components'
import { Button } from './library'

export default function Alerts() {
    return <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <SectionContainer>
            <SectionHeader sectionName='notifications' />
            <div className="p-6 space-y-4">
                <Button>New note</Button>
            </div>
        </SectionContainer>
    </main>
}