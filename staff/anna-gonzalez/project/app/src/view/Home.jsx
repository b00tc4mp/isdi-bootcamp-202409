import { useState, useEffect } from 'react'

import logic from '../logic'
import { getCurrentHour } from '../util'

export default function Home() {
    const [name, setName] = useState(null)

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            if (!name)
                try {
                    logic.getUserName()
                        .then(response => {
                            setName(response.name)
                        })
                        .catch(error => {
                            alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
        } else setName(null)
    }, [])

    return <>
        {getCurrentHour() < 12 ? <h2>Good morning {name}!</h2> : <h2>Good afternoon {name}!</h2>}
    </>
}