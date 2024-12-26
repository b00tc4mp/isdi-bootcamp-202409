import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import searchCenters from '../../logic/users/index.js';

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);

    const q = searchParams.get('q'); // Query parameter
    const distance = searchParams.get('distance') || 0; // Default distance is 0

    useEffect(() => {
        const fetchResults = async () => {
            if (q || distance) {
                try {
                    const data = await searchCenters(q, distance); // Call search logic
                    setResults(data);
                } catch (err) {
                    setError(err.message);
                }
            }
        };
        fetchResults();
    }, [q, distance]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const qNew = form.q.value;
        const distanceNew = form.distance.value;

        if (qNew !== q || distanceNew !== distance) {
            setSearchParams({ q: qNew, distance: distanceNew });
        }
    };

    return (
        <main className="py-20">
            <h2 className="text-xl font-bold mb-4">Search Dive Centers</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Query"
                    name="q"
                    className="border p-2 rounded w-full"
                />
                <input
                    type="number"
                    placeholder="Distance (km)"
                    name="distance"
                    defaultValue="1"
                    className="border p-2 rounded w-full"
                />
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                    Search
                </button>
            </form>

            <p className="mt-4 bg-white">Search results for "{q}" within {distance} km:</p>
            {error && <p className="text-white">{error}</p>}
            <ul className="mt-4 space-y-2">
                {results.map((result, index) => (
                    <li key={index} className="border p-2 rounded">
                        <strong>{result.name}</strong> - {result.location} ({result.distance} km away)
                    </li>
                ))}
            </ul>
        </main>
    );
}