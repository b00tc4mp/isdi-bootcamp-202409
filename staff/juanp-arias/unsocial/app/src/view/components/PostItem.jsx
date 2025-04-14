import { useState } from 'react'
import './PostItem.css'
import { Button } from '../library'
import Comments from './Comments'

import logic from '../../logic'
import dateAgo from '../../utilities/dateAgo'
import useContext from '../useContext'

export default function PostItem({ post, onLiked, onDeleted, onCommentAdded, onCommentRemoved }) {
    const { alert, confirm } = useContext()
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
            logic.toggleLikePosts(id)
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

            {logic.roleModerator() && <button className="buttondelete" onClick={handleDeleteClick}>⚒️</button>}

        </div>

        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}
        <time>{dateAgo(date)} ago...</time>
    </article>
}

