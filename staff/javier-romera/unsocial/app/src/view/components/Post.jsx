import { useState } from 'react'

import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'

import { errors } from 'apu'

const { SystemError } = errors

import { getElapsedTime } from '../../util'

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
            logic.toggleLikePost(id)
                .then(() => {
                    onLiked()
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

    const handleDeleteClick = () => {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                logic.deletePost(id)
                    .then(() => {
                        onDeleted()
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

    return <article className="text-start w-11/12 border border-[var(--color)] pb-4 pl-2 pr-2 mb-4">
        <div className="flex justify-between items-center mt-1">
            <h4>{author.username}</h4>

            {logic.getUserId() === author.id && <Button classname="flex w-6 h-6 items-center justify-center" type="button" onClick={handleDeleteClick}>❌</Button>}
            {logic.isUserRoleModerator() && <Button>💀</Button>}
        </div>

        <img className="w-full mt-1" src={image}></img>

        <div className="flex items-center">
            <Button classname="flex w-6 h-6 items-center justify-center" onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'}`}</Button>

            <span className="ml-1 mr-4">{likes}</span>

            <Button classname="flex w-6 h-6 items-center justify-center" onClick={handleCommentsClick}>💬 </Button>
            <span className="ml-1 mr-4">{comments}</span>
        </div>

        <p className="text-sm">{text}</p>

        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved} />}

        {view === 'comments' && <p className="text-xs" onClick={handleViewCommentsHide}>Hide comments</p>}

        {view !== 'comments' && <p className="text-xs" onClick={handleViewCommentsShow}>View comments...</p>}

        <time className="text-xs">{getElapsedTime(date)} ago</time>
    </article >
}
