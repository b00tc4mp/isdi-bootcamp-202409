import { useState } from 'react'

import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import { getElapsedTime } from '../../util'

import useContext from '../useContext'

import './Post.css'

export default function Post({ post, onLiked, onDeleted, onCommentAdded, onCommentRemoved, onSaved = () => {} }) {
    const [view, setView] = useState(null)

    const { alert, confirm } = useContext()

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
            logic.toggleLikePost(id)
                .then(onLiked)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleDeleteClick = () => {
        confirm('Delete post?', accepted => {
            if (accepted) {
                try {
                    logic.deletePost(id)
                        .then(onDeleted)
                        .catch(error => {
                            alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }
        })
    }

    const handleCommentsClick = () => setView(view ? null : 'comments')

    const handleSaveClick = () => {
        try {
            logic.savePost(id)
                .then(() => {
                    alert('Post saved in ⭐')
                    onSaved?.()
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

    console.log('Post -> render')

    return <article className="Post" >
        <h4>{author.username}</h4>

        <img src={image} />

        <p>{text}</p>

        <time>{getElapsedTime(date)} ago</time>

        <Button onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes}`}</Button>

        {author.id === logic.getUserId() && <Button onClick={handleDeleteClick}>🗑️</Button>}

        <Button onClick={handleCommentsClick}>💬 {comments}</Button>

        <Button onClick={handleSaveClick}>⭐</Button>

        {logic.isUserRoleModerator() && <Button>💀</Button>}

        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}
    </article >
}