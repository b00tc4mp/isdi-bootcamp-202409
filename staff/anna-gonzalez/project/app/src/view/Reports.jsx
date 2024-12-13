import { useState, useEffect } from 'react'

import logic from '../logic'

export default function Reports() {
    const [report, setReport] = useState([])

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            try {
                logic.getCyclesDetails()
                    .then(reports => {
                        setReport(reports)
                    })
                    .catch(error => {
                        alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }
    }, [report])

    return <>
        <h2>Reports</h2>

        <p></p>
    </>
}