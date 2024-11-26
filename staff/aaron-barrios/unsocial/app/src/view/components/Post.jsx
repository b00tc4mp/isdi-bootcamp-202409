import { useState } from 'react'

import logic from '../../logic'
import Comments from './Comments'

import Button from '../library/Button'
import Field2 from '../library/Field2'

import useContext from '../useContext'

import { getElapsedTime } from '../../util'

import './Post.css'

export default function Post({ post, onLiked, onDeleted, onCommentAdded, onCommentRemoved }) {
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
                }
                catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }
        })
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

        <button onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'} ${likes} likes`}</button>

        <button onClick={handleCommentsClick}>💬 {comments} comments</button>

        <label style={{ opacity: '60%', fontSize: '13px', marginTop: '2%' }}>View comments...</label>
        <br />

        <time style={{ fontSize: 'xx-small', marginRight: '10px', marginTop: '2.5%' }}>{getElapsedTime(date)} ago</time>
        <p></p>

        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}

    </article >
}