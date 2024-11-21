import { useState, useEffect } from 'react'

import Comment from './Comment'
import AddComment from './AddComment'

import { errors } from 'apu'

const { SystemError } = errors

import logic from '../../logic'

export default function Comments({ postId, onAdded, onRemoved }) {
    const [comments, setComments] = useState([])
    const [initiated, setInitiated] = useState(false)

    useEffect(() => {
        try {
            logic.getComments(postId, (error, comments) => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
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
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)

                    return
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
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                }

                setComments(comments)

                onRemoved()
            })
        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    return <section className="Comments">
        <ul className="pl-2 pr-4 list-none">
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