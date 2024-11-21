import { useState } from 'react'

import { Button, Paragraph } from '../library'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'
import Comments from './Comments'

import { errors } from 'com'

const { SystemError } = errors

export default function PostItem({ post, onLiked, onDeleted, onCommented, onCommentRemoved }) {
    const [view, setView] = useState(null)

    const { id, author, image, text, date, liked, likes, comments } = post

    const handleLikeClick = () => {
        try {
            logic.likesInteraction(id, error => {
                if (error) {
                    if (error instanceof SystemError)
                        alert('Something went wrong, try again later.')
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

    const handleDeleteCLick = () => {
        const confirmDelete = window.confirm('Are you sure you want to delete this post?')

        if (confirmDelete) {
            try {
                logic.deletePost(id, error => {
                    if (error) {
                        if (error instanceof SystemError)
                            alert('Something went wrong, try again later.')
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

    console.log('PostItem -> render')

    return <article className="w-full bg-blue-500 pb-2">
        <div className="flex items-center text-xxs pl-4 justify-start gap-1 ">
            <span>👤</span>
            <h4 className="my-2 text-xs">{author.username}</h4>
        </div>

        <img src={image} className="w-full shadow-inner" />

        <div className="flex items-baseline text-sm pl-4 pr-4 justify-between">
            <div className="flex items-baseline justify-start gap-1 text-xxs">
                <Button type="button" className="w-fit bg-[dimgrey] rounded-md text-[lightgrey] border-solid border border-black text-xs" onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'}`}</Button>
                <span>{`${likes} likes`}</span>

                <Button className="w-fit bg-[dimgrey] rounded-md text-[lightgrey] border-solid border border-black text-xs" onClick={handleCommentsClick}>💬{comments}</Button>
            </div>

            <div>
                {author.id === logic.getUserId() &&
                    <Button type="button" className="w-fit bg-[dimgrey] rounded-md text-[lightgrey] border-solid border border-black text-xs"
                        onClick={handleDeleteCLick}>❌</Button>}

                {logic.isUserRoleModerator() && <Button>🔨</Button>}
            </div>
        </div>
        <div>
            {view === 'comments' && <Comments
                postId={id}
                onAdded={onCommented}
                onRemoved={onCommentRemoved}
            />}
        </div>

        <Paragraph className="pl-4 text-xxs">{text}</Paragraph>

        <time className="pl-4 text-xxs">{getElapsedTime(date)} ago</time>
    </article>
}