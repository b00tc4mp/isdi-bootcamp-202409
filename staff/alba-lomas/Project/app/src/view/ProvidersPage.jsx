


import { useState, useEffect } from "react"
import { Provider, ProviderList } from './components'

export default function ProviderList() {
    const [providers, setProviders] = useState([])

    useEffect(() => {
        const storedProviders = sessionStorage.getItem('providers')
        console.log(storedProviders)
        if (storedProviders) {
            setProviders(JSON.parse(setProviders))
        }
    }, [])

    useEffect(() => {
        if (providers.length > 0) {
            sessionStorage.setItem('providers', JSON.stringify(providers))
        }
    }, [providers])

    const handleAddProvider = (newProvider) => {
        setProviders((prevProviders) => {
            const updatedProviders = [...prevProviders, newProvider]
            return updatedProviders
        })
    }

    const handleDeleteProvider = (index) => {
        const updatedProviders = providers.filter((_, i) => i !== index)
        setProviders(updatedProviders)
    }

    return (
        <main className="flex justify-center items-center container mx-auto flex-col mt-10">
            <Provider onAddProvider={handleAddProvider} />
            <ProviderList providers={providers} onDeleteProvider={handleDeleteProvider} />
        </main>
    )
}