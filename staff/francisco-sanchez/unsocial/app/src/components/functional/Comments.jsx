import { useState, useEffect } from 'react'

//import { Component } from "react";

import Comment from "./Comment";
import AddComment from "./addComment";

import logic from "../../logic";

//export default class extends Component {
export default function Comments(props) {
    const [comments, setComments] = useState([]) //Como useState es un array lo podemos deconstruir

    useEffect(() => {
        console.log('Comments -> useEffect "componentDidMount"')

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

    const handleAdded = () => {
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

    const handleRemoved = () => {
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

        <AddComment
            postId={props.postId}
            onAdded={handleAdded}
        />
    </section>
}