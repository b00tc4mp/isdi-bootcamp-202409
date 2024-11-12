import { useState } from 'react'
import './PostItem.css'
import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'
import dateAgo from '../../utilities/dateAgo'


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
            logic.toggleLikePosts(id, error => {
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

    return <article className="PostItem">
        <div className='headerpost'>
            <h4>{author.username}</h4>
            {author.id === logic.getUserId() && <button className="buttondelete" onClick={handleDeleteClick}>❌</button>}
        </div>

        <img src={image} />

        <p>{text}</p>

        <div className='PostButtons'>
            <Button onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes} likes`}</Button>

            <Button className="ButtonPost" onClick={handleCommentsClick}>🗨️{comments}</Button>

        </div>

        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}
        <time>{dateAgo(date)} ago...</time>
    </article>
}

