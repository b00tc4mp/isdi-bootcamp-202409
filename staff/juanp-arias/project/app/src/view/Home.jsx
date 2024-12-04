import { Button } from './library'
import { SectionHeader } from './components'

export default function Home(props) {
    return <main className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg overflow-hidden">
            <SectionHeader sectionName='studify' />
            <div className="p-6 space-y-4">
                <Button>Notifications</Button>
                <Button>Schedule</Button>
            </div>
        </div>
    </main>
}