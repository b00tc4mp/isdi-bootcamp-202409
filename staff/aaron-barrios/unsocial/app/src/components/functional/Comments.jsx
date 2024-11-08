import { useState, useEffect } from 'react'

import Comment from './Comment'
import CreateComment from './CreateComment'

import logic from "../../logic"


export default function Comments(props) {
    const [comments, setComments] = useState([])

    useEffect(() => {
        try {
            logic.getComments(props.postId, (error, comments) => {
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
            logic.getComments(props.postId, (error, comments) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

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
            logic.getComments(props.postId, (error, comments) => {
                if (error) {
                    alert(error.message)

                    console.error(error)

                    return
                }

                setComments(comments)

                props.onRemoved()
            })

        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }


    return <section>
        <ul>
            {this.state.comments.map(comment =>
                <Comment
                    key={comment.id}
                    postId={props.postId}
                    comment={comment}
                    onRemoved={handleRemoved}
                />)
            }
        </ul>

        <CreateComment
            postId={props.postId}
            onAdded={handleAdded}
        />
    </section>
}