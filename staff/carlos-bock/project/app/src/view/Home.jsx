import { useState, useEffect } from 'react'

import Recommend from './components/Recommend.jsx'

import logic from '../logic'

export default function Home() {
    const [recommend, setRecommend] = useState([])

    useEffect(() => {
        console.log('Home -> useEffect "componentDidMount"')

        try {
            logic.getRecommend()
                .then(setRecommend)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })

        } catch (error) {
            alert(error.message)

            console.error(error)
        }

    }, [])

    ////////////////

    const handleUpVote = () => {
        try {
            logic.getRecommend()
                .then(setRecommend)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleDownVote = () => {
        try {
            logic.getRecommend()
                .then(setRecommend)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    ///////////////////

    const handleDeleted = () => {
        try {
            logic.getRecommend()
                .then(setRecommend)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleCommentAdded = () => {
        try {
            logic.getRecommend()
                .then(setRecommend)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleCommentRemoved = () => {
        try {
            logic.getRecommend()
                .then(setRecommend)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    console.log('Home -> render')


    return <div className='py-12'>

        {recommend.map((recommend) => <Recommend
            key={recommend.id}
            recommend={recommend}
            onUpVote={handleUpVote}
            onDownVote={handleDownVote}
            onDeleted={handleDeleted}
            onCommentAdded={handleCommentAdded}
            onCommentRemoved={handleCommentRemoved}
        />)}

    </div>
}