import { useState } from 'react'

import { Button, Paragraph } from '../library'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'
import Comments from './Comments'

import './PostItem.css'

export default function PostItem({ post, onLiked, onDeleted, onCommented, onCommentRemoved }) {
    const [view, setView] = useState(null)

    const { id, author, image, text, date, liked, likedBy, comments } = post

    const handleLikeClick = () => {
        try {
            logic.likesInteraction(id, error => {
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

    const handleDeleteCLick = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?')

        if (confirmDelete) {
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

    console.log('PostItem -> render')

    return <article className="PostItem">
        <div className="username">
            <span>👤</span>
            <h4>{author.username}</h4>
        </div>

        <img src={image} />

        <div className="container">
            <div className="likes">
                <Button type="button" className="likes" onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'}`}</Button>
                <span>{`${likedBy.length} likes`}</span>

                <Button className="comments" onClick={handleCommentsClick}>💬 {comments}</Button>

                {view === 'comments' && <Comments
                    postId={id}
                    onAdded={onCommented}
                    onRemoved={onCommentRemoved}
                />}
            </div>

            <div>
                {author.id === logic.getUserId() &&
                    <Button type="button" className="delete"
                        onClick={handleDeleteCLick}>❌</Button>}
            </div>
        </div>

        <Paragraph className="post-item">{text}</Paragraph>

        <time>{getElapsedTime(date)} ago</time>
    </article>
}