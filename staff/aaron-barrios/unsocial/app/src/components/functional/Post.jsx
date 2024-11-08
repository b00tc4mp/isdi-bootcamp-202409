import { useState } from 'react'

import logic from '../../logic'
import Comments from './Comments'

import Button from '../library/Button'

import getElapsedTime from '../../utils/getElapsedTime'

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
                    alert(error)

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
                        alert(error)

                        console.error(error)

                        return
                    }

                    onDeleted()
                })
            }
            catch (error) {
                alert(error.message)

                console.error(error)
            }
        }
    }


    const handleCommentsClick = () => setView(view ? null : 'comments')

    return <article className="Post">

        {author.id === logic.getUserId() &&
            <Button onClick={handleDeleteClick}>Delete Post</Button>}

        <Field2>
            <p>Author:{author.username}</p>
            <text>{text}</text>
        </Field2>

        <img src={image} className='img' />
        <br />
        <button onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes.length}`}</button>
        <button onClick={handleCommentsClick}>💬 {comments} comments</button>
        <label style={{ opacity: '60%', fontSize: '13px', marginTop: '2%' }}>View comments...</label>
        <br />
        <time style={{ fontSize: 'xx-small', marginRight: '10px', marginTop: '2.5%' }}>{getElapsedTime(date)}</time>
        <p></p>

        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}

    </article >
}