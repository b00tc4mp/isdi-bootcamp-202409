import { useState, useEffect } from 'react'
import Comment from './Comment.jsx'
import AddComment from './AddComment.jsx'
import logic from '../../logic/index.js'

export default function CommentsInRec({ recommendId, onAdded, onRemoved }) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        console.log('Comments -> useEffect "componentDidMount')

        try {
            logic.getComments(recommendId)
                .then(setComments)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [recommendId])

    const handleAdded = () => {
        try {
            logic.getComments(recommendId)
                .then(comments => {
                    setComments(comments)

                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRemoved = (commentId) => {
        try {
            logic.removeComment(recommendId, commentId)
                .then(() => {
                    setComments((prev) => prev.filter(
                        comment => comment.id !== commentId))

                })
                .catch(error => {
                    alert(error.message)
                    console.error(error)
                });
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    console.log('Comments -> render')

    return <section className='mt-6 border-solid border-black'>
        <ul >
            {comments.map(comment =>
                <Comment
                    key={comment.id}
                    recommendId={recommendId}
                    comment={comment}
                    onRemoved={handleRemoved}
                />)
            }
        </ul>

        <AddComment
            recommendId={recommendId}
            onAdded={handleAdded}
        />
    </section>
}