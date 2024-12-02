import { useState, useEffect } from 'react'

import logic from '../logic'
import { getHour, getWeekDayText } from '../util'

export default function Home() {
    const [name, setName] = useState(null)
    const weekDay = getWeekDayText()

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
        <p>{weekDay}</p>

        {getHour() >= 18 ? (<h2>Good evening {name}!</h2>)
            : getHour() >= 12 ? (<h2>Good afternoon {name}!</h2>)
                : getHour() >= 6 ? (<h2>Good morning {name}!</h2>)
                    : (<h2>Good night {name}!</h2>)}
    </>
}