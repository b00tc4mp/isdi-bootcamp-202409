import { useState } from 'react'

import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import { errors } from 'apu'

const { SystemError } = errors

import { getElapsedTime } from '../../util'

import './Post.css'

export default function Post({ post, onLiked, onDeleted, onCommentAdded, onCommentRemoved }) {
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
        if (confirm('Are you sure you want to delete this post?')) {
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

    const handleCommentsClick = () => {
        setView(view ? null : 'comments')
    }

    const handleViewCommentsShow = () => {
        setView(view ? null : 'comments')
    }

    const handleViewCommentsHide = () => {
        setView(view ? null : 'comments')
    }

    return <article className="Post">
        <div className="post-header">
            <h4>{author.username}</h4>

            {logic.getUserId() === author.id && <Button classname="delete-button" type="button" onClick={handleDeleteClick}>❌</Button>}
            {logic.isUserRoleModerator() && <Button>💀</Button>}
        </div>

        <img src={image}></img>

        <div className="likes-div">
            <Button classname="like-button" onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'}`}</Button>

            <span>{likes}</span>

            <Button classname="comment-button" onClick={handleCommentsClick}>💬 </Button>
            <span>{comments}</span>
        </div>

        <p className="caption">{text}</p>

        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved} />}

        {view === 'comments' && <p onClick={handleViewCommentsHide}>Hide comments</p>}

        {view !== 'comments' && <p onClick={handleViewCommentsShow}>View comments...</p>}

        <time>{getElapsedTime(date)} ago</time>
    </article >
}
