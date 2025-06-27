import { useState } from 'react'
import { Button } from '../library'
import Comments from './Comments'
import logic from '../../logic'
import { getElapsedTime } from '../../utils'

import useContext from '../../view/useContext'

export default function Post({ post, onLiked, onDeleted, onCommentAdded, onCommentRemoved }) {
    const [view, setView] = useState(null)

    const { alert } = useContext()

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
        const confirmDelete = window.confirm("Are you sure you want to delete this post?")

        if (confirmDelete) {
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
    }

    const handleCommentsClick = () => setView(view ? null : 'comments')

    console.log('PostItem -> render')

    return < article className="Post p-2.5 mb-3.5 rounded-[10px] shadow-lg" >

        <h4>{author.username}</h4>
        <div className="Post p-2.5 mb-3.5 rounded-[10px] shadow-lg">
            <img className="border border-solid border-[1px] max-w-full w-full h-auto rounded-[1%] transition-all duration-500 ease-in-out hover:scale-105" src={image} />
        </div>
        <p className="text-[14px] leading-[1.4] text-[#555]">{text}</p>

        <time className="text-[12px] text-[#777]">{getElapsedTime(date)} ago </time>

        <div classNameName='contenedorBotones'>

            <Button className="inline-flex items-baseline gap-4" onClick={handleLikeClick}>{`${liked ? '❤️' : '🤍'}`}{`${likes} `}</Button>

            {author.id === logic.getUserId() && <Button type="button" onClick={handleDeleteClick}>🗑️</Button>}

            <Button onClick={handleCommentsClick}>💬 {comments} comments</Button>

            {logic.isUserRoleModerator() && <Button >💀</Button>}

        </div>

        {
            view === 'comments' && <Comments
                postId={id}
                onAdded={onCommentAdded}
                onRemoved={onCommentRemoved}
            />
        }

    </article >
}





