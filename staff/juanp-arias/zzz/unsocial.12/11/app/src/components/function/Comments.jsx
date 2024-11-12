import { useState, useEffect } from 'react'
import './Comments.css'
import AddComments from './AddComments'
import Comment from './Comment'

import logic from '../../logic'

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

    const onAdded = () => {
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

    const onRemoved = () => {
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
        <ul className='comments'>
            {comments.map(comment =>
                <Comment
                    key={comment.id}
                    postId={props.postId}
                    comment={comment}
                    onRemoved={onRemoved}
                />)
            }
        </ul>

        <AddComments
            postId={props.postId}
            onAdded={onAdded}
        />
    </section>
}