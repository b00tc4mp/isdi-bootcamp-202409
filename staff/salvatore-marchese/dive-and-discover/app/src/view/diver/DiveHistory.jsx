//working in progress...
import { useState, useEffect } from 'react'
import { Button } from '../library'
import logic from '../../logic/log/index.js'
import { useNavigate } from 'react-router-dom'

const DiveHistory = () => {
    const [logs, setLogs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // Fetch dive logs on component mount
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const fetchedLogs = await logic.getLogs()
                setLogs(fetchedLogs)
                setIsLoading(false)
            } catch (err) {
                setError('Error fetching logs')
                setIsLoading(false)
            }
        }
        fetchLogs()
    }, [])

    // Handle log deletion
    const handleDelete = async (logbookId) => {
        try {
            await logic.deleteLog(logbookId)
            setLogs(logs.filter(log => log._id !== logbookId)) // Remove deleted log from UI
        } catch (err) {
            setError('Error deleting log')
        }
    }

    // Handle log update (example logic to navigate to a form for editing)
    const handleEdit = (logbookId) => {
        navigate(`/edit-log/${logbookId}`)
    }

    if (isLoading) return <p className="text-center">Loading logs...</p>
    if (error) return <p className="text-center text-red-500">{error}</p>

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Dive Log History</h2>
            
            <div className="space-y-4">
                {logs.length === 0 ? (
                    <p className="text-center text-gray-500">No dive logs found.</p>
                ) : (
                    logs.map(log => (
                        <div key={log._id} className="p-4 border rounded-lg shadow-md hover:shadow-lg">
                            <h3 className="text-xl font-semibold text-blue-700">{log.diveSite}</h3>
                            <p><strong>Date:</strong> {new Date(log.date).toLocaleDateString()}</p>
                            <p><strong>Depth:</strong> {log.depth}m</p>
                            <p><strong>Time:</strong> {log.time} mins</p>
                            <p><strong>Visibility:</strong> {log.visibility}m</p>
                            <p><strong>Weather:</strong> {log.weather}</p>
                            
                            <div className="flex justify-end gap-4 mt-4">
                                <Button
                                    className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                                    onClick={() => handleEdit(log._id)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                                    onClick={() => handleDelete(log._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default DiveHistory