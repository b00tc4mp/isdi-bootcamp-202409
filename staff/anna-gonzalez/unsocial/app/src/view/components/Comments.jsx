import { useState, useEffect } from 'react'
import Comment from './Comment'
import AddComment from './AddComment'
import logic from '../../logic'
import { errors } from 'com'

const { SystemError } = errors

export default function Comments(props) {
    const [comments, setComments] = useState([])
    const [initialized, setInitialized] = useState(false)

    useEffect(() => {
        console.log('Comments -> useEffect "componentDidMount')

        try {
            logic.getComments(props.postId)
                .then(() => {
                    setComments
                    setInitialized(true)
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }, [])

    const handleAdded = () => {
        try {
            logic.getComments(props.postId)
                .then(comments => {
                    setComments(comments)

                    props.onAdded()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleRemoved = () => {
        try {
            logic.getComments(props.postId)
                .then(comments => {
                    setComments(comments)

                    props.onRemoved()
                })
                .catch(error => {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
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
                    postId={props.postId}
                    comment={comment}
                    onRemoved={handleRemoved}
                />)
            }
        </ul>

        {initialized && <AddComment
            postId={props.postId}
            onAdded={handleAdded}
        />}
    </section >
}