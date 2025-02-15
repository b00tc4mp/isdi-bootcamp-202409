import { useState, useEffect } from 'react';
import logic from '../../logic/log/index.js';
import { useNavigate } from 'react-router-dom';
import extractPayloadFromJWT from '../../util/extractPayloadFromJWT.js';

const DiveHistory = () => {
    const [logs, setLogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch dive logs on component mount
    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const fetchedLogs = await logic.getLogs();
                setLogs(fetchedLogs);
                setIsLoading(false);
            } catch (err) {
                setError('Error fetching logs');
                setIsLoading(false);
            }
        };
        fetchLogs();
    }, []);

    // Handle log deletion
    const handleDelete = async (logbookId) => {
        try {
            const token = sessionStorage.getItem('token'); // Retrieve the token
            if (!token) {
                setError('User not authenticated');
                return;
            }

            const payload = extractPayloadFromJWT(token); // Extract payload from the token
            const userId = payload.sub; // Assume `sub` contains the `userId`

            console.log(logbookId);

            await logic.deleteLog(userId, logbookId); // Call deleteLog with userId and logbookId
            setLogs(logs.filter((log) => log._id !== logbookId)); // Remove the deleted log from the UI
        } catch (err) {
            console.error(err);
            setError('Error deleting log');
        }
    };

    // Handle log update (example logic to navigate to a form for editing)
    const handleEdit = (logbookId) => {
        navigate(`/edit-logbook/${logbookId}`);
    };

    if (isLoading) return <p className="text-center">Loading logs...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <main className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Dive Log History</h2>

            <div className="space-y-4">
                {logs.length === 0 ? (
                    <p className="text-center text-gray-500">No dive logs found.</p>
                ) : (
                    logs.map((log) => (
                        <div
                            key={log._id}
                            className="p-4 border rounded-lg shadow-md hover:shadow-lg bg-gray-200"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-700 underline">
                                        {log.diveSite}
                                    </h3>
                                    <p>
                                        <strong>Date:</strong>{' '}
                                        {new Date(log.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-yellow-400 py-2 px-4 rounded"
                                        onClick={() => handleEdit(log._id)}
                                    >
                                        edit
                                    </button>
                                    <button
                                        className="bg-blue-500 hover:bg-red-700 text-yellow-400 py-2 px-4 rounded"
                                        onClick={() => handleDelete(log._id)}
                                    >
                                        delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </main>
    );
};

export default DiveHistory;