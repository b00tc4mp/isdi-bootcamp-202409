import { useState, useEffect } from 'react'
import './Comments.css'
import AddComments from './AddComments'
import Comment from './Comment'

import logic from '../../logic'
import useContext from '../useContext'

export default function Comments(props) {
    const [comments, setComments] = useState([])
    const { alert } = useContext()
    useEffect(() => {
        try {
            logic.getComments(props.postId)
                .then(setComments)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {

            alert(error.message)
            console.error(error)
        }
    }, [])

    const onAdded = () => {
        try {
            logic.getComments(props.postId)
                .then(comments => {
                    setComments(comments)

                    props.onAdded()
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

    const onRemoved = () => {
        try {
            logic.getComments(props.postId)
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