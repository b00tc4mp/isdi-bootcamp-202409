import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function Search() {
    console.log('Search -> render')

    const [searchParams, setSearchParams] = useSearchParams()

    const q = searchParams.get('q')
    const distance = searchParams.get('distance') || 0

    useEffect(() => {
        if (q || distance)
            console.log('searchPosts', q, distance)
    }, [q, distance])
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const qNew = form.q.value
        const distanceNew = form.distance.value

        if (qNew !== q || distanceNew !== distance)
            setSearchParams({ q: qNew, distance: distanceNew })
    }
    return <main className="py-20">
        <h2>Search</h2>

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="query" name="q" />
            <input type="number" placeholder="distance" name="distance" defaultValue="1" />

            <button type="submit">Search</button>
        </form>

        <p>do a search about {q} and {distance}km</p>
    </main>

}