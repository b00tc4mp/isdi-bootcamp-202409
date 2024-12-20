import { useState, useEffect } from 'react'

import Comment from './Comment.jsx'
import AddComment from './AddComment.jsx'

import logic from '../../logic/index.js'

export default function Comments(props) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        console.log('Comments -> useEffect "componentDidMount')

        try {
            logic.getComments(props.recommendId)
                .then(setComments)
                .catch(error => {
                    alert(error)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [props.recommendId])//

    const handleAdded = () => {
        try {
            logic.getComments(props.recommendId)
                .then(comments => {
                    setComments(comments)

                    props.onAdded()
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }



    console.log('Comments -> render')

    return <section>
        <p>{props.recommendText}</p>{/**/}

        <AddComment
            recommendId={props.recommendId}
            onAdded={handleAdded}
        />
    </section>
}