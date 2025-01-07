export default function Loading() {
    return <main className='flex justify-center items-center bg-gray-100 dark:bg-gray-800 min-h-screen'>
        <div className='flex flex-col items-center justify-center'>
            <div className='w-16 h-16 border-4 border-blue-500 dark:border-blue-300 border-t-transparent rounded-full animate-spin'></div>
            <p className='mt-4 text-gray-700 dark:text-gray-300 font-medium text-lg'>Loading...</p>
        </div>
    </main>
}