import { useState, useEffect } from 'react'

import Comment from './Comment.jsx'
import AddComment from './AddComment.jsx'

import logic from '../../logic/index.js'

export default function CommentsInRec(props) {
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

    const handleRemoved = () => {
        try {
            logic.getComments(props.recommendId)
                .then(comments => {
                    setComments(comments)

                    props.onRemoved()
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

    console.log('Comments -> render')
    console.log(comments)
    return <section>
        <ul>
            {comments.map(comment =>
                <Comment
                    key={comment.id}
                    recommendIdId={props.recommendId}
                    comment={comment}
                    onRemoved={handleRemoved}
                />)
            }
        </ul>

        <AddComment
            recommendId={props.recommendId}
            onAdded={handleAdded}
        />
    </section>
}