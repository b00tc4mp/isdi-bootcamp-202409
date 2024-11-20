import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Button, Form, Input } from '../components/library'

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

    return <main className="w-full p-5 flex-1 box-border">
        <section className='content-center max-w-96 mt-20 bord rounded-lg'>
            <h2 className="text-center text-[18px] text-[#584747]">Search</h2>

            <Form onSubmit={handleSubmit}>
                <Input type="text" placeholder="query" name="q" />
                <Input type="number" placeholder="distance" name="distance" defaultValue="1" />

                <Button type="submit">Search</Button>
            </Form>

            <p className=' text-[#584747]'>do a search about {q} and {distance}km</p>
        </section>
    </main>

}