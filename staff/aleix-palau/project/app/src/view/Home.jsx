import { useState } from 'react'
import { Header, Footer } from './components'
import { Profile, Heartbeats, People, Chat, Concerts } from './pages'

export default function Home() {
    const [activePage, setActivePage] = useState('people')

    const renderActivePage = () => {
        switch (activePage) {
            case 'profile':
                return <Profile />
            case 'heartbeats':
                return <Heartbeats />
            case 'people':
                return <People />
            case 'chat':
                return <Chat />
            case 'concerts':
                return <Concerts />
            default:
                return <People />
        }
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-none">
            </div>

            <main className="flex-grow overflow-auto">
                {renderActivePage()}
            </main>

            <Footer activePage={activePage} setActivePage={setActivePage} />
        </div >
    )
}