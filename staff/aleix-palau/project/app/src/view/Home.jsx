// import { useState, useEffect } from 'react'

// import logic from '../logic'

export default function Home() {
    // // const [name, setName] = useState(null)

    // useEffect(() => {
    //     console.log('Home -> useEffect "componentDidMount"')

    //     try {
    //         logic.getUserName()
    //             .then()
    //             .catch(error => {
    //                 alert(error.message)

    //                 console.error(error)
    //             })
    //     } catch (error) {
    //         alert(error.message)

    //         console.error(error)
    //     }
    // }, [])

    console.log('Home -> render')

    return <p>Hola!</p>
}