import { useState, useEffect } from 'react'

///create and import a recomendation component

import logic from '../logic'

export default function Home() {
    const [recommend, setRecommend] = useState([])


    /* get recommedation logic placeholder
    useEffect(() => {
        console.log('Home -> useEffect "componentDidMount"')

        try {
            logic.getReccomend()
                .then(setRecommend)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })

        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    }, [])*/


    ////////////////////////////////////////////


    return <div className='py-12'>

        <div>Hello Home</div>

    </div>
}