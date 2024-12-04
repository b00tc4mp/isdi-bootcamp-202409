import { Navigation } from '../library'

export default function Footer(props) {
    return <footer className="fixed bottom-0 left-0 w-full bg-yellow-500 text-blue py-2">
        <main className="max-w-3xl mx-auto flex justify-around">
            <Navigation to="/home">
                <span>🏠</span>
                <span>Home</span>
            </Navigation>

            <Navigation to="">
                <span>📖</span>
                <span>Log Book</span>
            </Navigation>

            <Navigation to="">
                <span>🔍</span>
                <span>Search</span>
            </Navigation>

            <Navigation to="">
                <span>🤿</span>
                <span>Profile</span>
            </Navigation>
        </main>
    </footer>
}