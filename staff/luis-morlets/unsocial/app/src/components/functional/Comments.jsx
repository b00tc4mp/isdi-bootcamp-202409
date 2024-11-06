import { useEffect, useState } from 'react'

import Comment from './Comment'
import AddComment from './AddComment'

import logic from '../../logic'

export default function Comments({ postId, onAdded, onRemoved }) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        try {
            logic.getComments(postId, (error, comments) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }
                setComments(comments)
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [])

    const handleAdded = () => {
        try {
            logic.getComments(postId, (error, comments) => {
                if (error) {
                    alert(error.message)

                    console.error(error)
                }
                setComments(comments)

                onAdded()
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRemoved = () => {
        try {
            logic.getComments(postId, (error, comments) => {
                if (error) {
                    alert(error.message)

                    console.error(error)
                }
                setComments(comments)
                onRemoved()
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    console.log('Comments -> render')

    return <section className="Comments">
        <ul>
            {comments.map(comment =>
                <Comment
                    key={comment.id}
                    postId={postId}
                    comment={comment}
                    onRemoved={handleRemoved}
                />)}
        </ul>
        <AddComment
            postId={postId}
            onAdded={handleAdded}
        />
    </section>
}