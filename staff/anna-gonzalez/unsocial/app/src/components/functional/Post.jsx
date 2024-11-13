import { useState } from 'react'

import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import './Post.css'

export default function Post({ post, onLiked, onSaved, onDeleted, onCommentAdded, onCommentRemoved }) {
    const [view, setView] = useState(null)

    const {
        id,
        author,
        image,
        text,
        date,
        liked,
        saved,
        likes,
        saves,
        comments
    } = post

    const handleSavedClick = () => {
        try {
            logic.toggleSavePost(id, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
                        alert(error.message)

                    console.error(error)

                    return
                }

                onSaved()
            })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleLikeClick = () => {
        try {
            logic.toggleLikePost(id, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Sorry, try again later')
                    else
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
                        if (error instanceof SystemError)
                            alert('Sorry, try again later')
                        else
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

    console.log('Post -> render')

    console.log('Post -> render')

    return <article className="Post">
        <div className="above-photo-content">
            <h4>{author.username}</h4>

            <Button className="save-post-button"
                onClick={handleSavedClick}>{`📌 ${saves}`}</Button>
        </div>

        <img src={image} />

        <p>{text}</p>

        <time>{getElapsedTime(date)} ago</time>

        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}

        <div className="post-buttons">
            <Button className="no-style-button"
                onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes}`}</Button>

            {author.id === logic.getUserId() && <Button className="no-style-button"
                onClick={handleDeleteClick}>❌</Button>}

            <Button className="no-style-button"
                onClick={handleCommentsClick}>💬 {comments}</Button>
        </div>
    </article >
}