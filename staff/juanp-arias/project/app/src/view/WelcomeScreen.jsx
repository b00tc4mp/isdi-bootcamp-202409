import logo from '../assets/logo.png'

export default function WelcomeScreen({ onLoginClick, onStartedClick }) {
    const handleLoginClick = event => {
        event.preventDefault()
        onLoginClick()
    }
    const handleStartedClick = event => {
        event.preventDefault()
        onStartedClick()
    }

    return <main className='flex flex-col items-center justify-between min-h-screen bg-blue-100 dark:bg-gray-900 py-8 transition-colors duration-300'>
        <div className='text-center'>
            <h1 className='text-gray-400 dark:text-gray-300 text-lg font-medium'>studify</h1>
        </div>
        <div className='flex flex-col items-center'>
            <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6'>All in one application</h2>
            <img src={logo} alt='App Icon' className='w-80 h-80 rounded-lg' />
        </div>
        <div className='w-full max-w-xs space-y-4 px-4'>
            <button className='w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition' onClick={handleLoginClick}>Log in</button>
            <button className='w-full bg-white text-blue-500 py-3 rounded-lg font-medium border border-blue-500 hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700 transition' onClick={handleStartedClick}>Get started</button>
        </div>
    </main>
}