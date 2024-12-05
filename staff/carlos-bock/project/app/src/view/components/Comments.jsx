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
    }, [])

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

    return <section>
        <ul>
            {comments.map(comment =>
                <Comment
                    key={comment.id}
                    recommendId={props.id}
                    comment={comment}
                    onRemoved={handleRemoved}
                />)
            }
        </ul>

        <AddComment
            recommendId={props.postId}
            onAdded={handleAdded}
        />
    </section>
}