import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getFaunaFlora from '../../logic/users/getFaunaFloraByCity.js';

const FaunaFlora = () => {
    const { city } = useParams();
    const [faunaFloraData, setFaunaFloraData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getFaunaFlora(city);
                setFaunaFloraData(data);
            } catch (err) {
                setError(err.message || 'Error fetching fauna and flora data.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [city]);

    if (isLoading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <main className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
                Fauna & Flora in {city}
            </h2>
            <p className="text-gray-600 mb-4">{faunaFloraData.description}</p>

            <div>
                <h3 className="text-xl font-semibold text-blue-700">Fauna:</h3>
                <ul className="list-disc list-inside ml-4">
                    {faunaFloraData.fauna.map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-4">
                <h3 className="text-xl font-semibold text-blue-700">Flora:</h3>
                <ul className="list-disc list-inside ml-4">
                    {faunaFloraData.flora.map((item, index) => (
                        <li key={index} className="text-gray-700">{item}</li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default FaunaFlora;