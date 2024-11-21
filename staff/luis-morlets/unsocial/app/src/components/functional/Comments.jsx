import { useEffect, useState } from 'react'

import Comment from './Comment'
import AddComment from './AddComment'

import logic from '../../logic'

import { errors } from 'com'

const { SystemError } = errors

export default function Comments({ postId, onAdded, onRemoved }) {
    const [comments, setComments] = useState([])
    const [initiated, setInitiated] = useState(false)

    useEffect(() => {
        try {
            logic.getComments(postId, (error, comments) => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                }
                setComments(comments)
                setInitiated(true)
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
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
                    else
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
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
                    else
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

    return <section>
        <ul>
            {comments.map(comment =>
                <Comment
                    key={comment.id}
                    postId={postId}
                    comment={comment}
                    onRemoved={handleRemoved}
                />)}
        </ul>
        {initiated && <AddComment
            postId={postId}
            onAdded={handleAdded}
        />}
    </section>
}