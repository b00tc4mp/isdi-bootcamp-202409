import { useState, useEffect } from 'react'
import { errors } from 'com'
import Comment from './Comment'
import AddComment from './AddComment'

import logic from '../../logic'

const { SystemError } = errors

export default function Comments({ postId, onAdded, onRemoved }) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        try {
            logic.getComments(postId, (error, comments) => {
                if (error instanceof SystemError) {
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
                if (error instanceof SystemError) {
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
                if (error instanceof SystemError) {
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


    console.log('Comments -> render')

    return <section className="align-center p-5 max-w-[400px] mx-auto mt-12 mb-12 bg-[#dcd7d7] rounded-[10px] shadow-md w-full box-border">
        <ul className="list-none text-center p-0">
            {comments.map(comment =>
                <Comment
                    key={comment.id}
                    postId={postId}
                    comment={comment}
                    onRemoved={handleRemoved}
                />)
            }
        </ul>

        <AddComment
            postId={postId}
            onAdded={handleAdded}
        />
    </section>
}
