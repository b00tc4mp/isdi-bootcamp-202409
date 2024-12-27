import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Container from './library/Container'
import Form from './library/Form'
import Input from './library/Input'
import Button from './library/Button'
import Span from './library/Span'


export default function SearchProvider() {
    const navigate = useNavigate()
    const location = useLocation()
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')

    const q = searchParams.get('q')
    const distance = searchParams.get('distance')

    useEffect(() => {
        if (q)
            setQuery(q, distance)
    }, [q, distance])

    const handleSearchProviderSubmit = event => {
        event.preventDefault()

        const form = event.target

        const { value: query } = form.q
        const { value: distance } = form.distance

        if (!query.trim())
            navigate('/search')
        else if (location.pathname !== '/search')
            navigate(`/search?q=${query}&distance=${distance}`)
        else
            setSearchParams({ q: query, distance })

        setQuery(query)
    }

    const handleInputChange = event => {
        const { value: query } = event.target

        setQuery(query)
    }

    return <>
        <Container>
            <Form onSubmit={handleSearchProviderSubmit}>
                <Container className="flex flex-row items-center" >
                    <input className="border border-black" type="text" name="q" id="search-input" placeholder="Search" value={query} onChange={handleInputChange} />
                    <Button type="submit">Search</Button>
                </Container>
            </Form>
        </Container>
    </>
}