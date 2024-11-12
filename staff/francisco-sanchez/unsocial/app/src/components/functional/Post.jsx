import { useState } from 'react'

import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import './Post.css'
//import { Component } from 'react'

//export default class extends Component {
export default function PostItem({ post, onLiked, onDeleted, onCommentAdded, onCommentRemoved }) {
    const [view, setView] = useState(null)

    const {
        id,
        author,
        image,
        text,
        date,
        liked,
        likes,
        comments
    } = post

    const handleLikeClick = () => {
        try {
            logic.toggleLikePost(id, error => {

                if (error) {
                    alert(error.message)
                    console.error(error)
                    return
                }

                onLiked()
            })

        } catch (error) {
            alert(error.message)
            console.error(error)
        }
    }

    const handleDeleteClick = () => {
        if (confirm('Delete post?')) {
            try {
                logic.deletePost(id, error => {
                    if (error) {
                        alert(error.message)
                        console.error(error)
                        return
                    }
                    onDeleted()
                })

            } catch (error) {
                alert(error.message)
                console.error(error)
            }
        }
    }

    const handleCommentsClick = () => setView(view ? null : 'comments')


    console.log('Post -> Render')


    return <article className="PostItem">
        <div className="publishedBy">
            Published by <span className="author">{author.username}</span>: <time>{getElapsedTime(date)} ago.</time>
        </div>

        <img src={image} className="postFrame" />
        <div className="postCommentAndLikes">
            {/* Botón para dar me gusta a los posts */}
            <p className="postText">{text}</p>

            {/* Botón Like */}
            <Button onClick={handleLikeClick}>{`${liked ? '💙' : '🤍'} ${likes}`}</Button>


            {/* Botón para Eliminar posts */}
            {author.id === logic.getUserId() && <Button onClick={handleDeleteClick}>❌</Button>}


            {/* Botón para mostrar los comentarios */}
            <Button onClick={handleCommentsClick}>💬 {comments}</Button>
        </div>

        <div className="comentsTexts">
            {view === 'comments' && <Comments
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved}
            />}
        </div>
    </article>

}