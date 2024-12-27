import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import useContext from '../context.js'

import logic from '../../logic'

import Provider from './Provider'

export default function ResultsProvidersList() {
    const [searchParams] = useSearchParams()
    const [Providers, setProviders] = useState([])
    const { alert } = useContext()

    const q = searchParams.get('q')
    const distance = Number(searchParams.get('distance'))

    useEffect(() => {
        loadProvider()
    }, [q, distance])

    const loadProvider = () => {
        if (q !== null) {
            navigator.geolocation.getCurrentPosition((position => {
                const coords = [position.coords.latitude, position.coords.longitude]
                try {
                    logic.searchProvider(q, distance, coords)
                        .then(Providers => setProviders(Providers))
                        .catch(error => {
                            console.error(error)

                            alert(error.message)
                        })
                } catch (error) {
                    console.error(error)

                    alert(error.message)
                }
            }), error => {
                console.error(error)

                alert(error.message)
            })
        }
    }

    return <section className="flex flex-col gap-6 mb-24">
        {Providers.map(Provider => <Provider
            key={Provider.id}
            Provider={Provider}
        />)}
    </section>
}