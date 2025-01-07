import { useState } from 'react'

import { Button } from '../library'

import Comments from './Comments'

import logic from '../../logic'

import { getElapsedTime } from '../../util'

import useContext from '../useContext'

export default function Adfound({ post, onLiked, onCommentAdded, onCommentRemoved }) {
    const [view, setView] = useState(null)

    const { alert } = useContext()
    const {
        id,
        image,
        text,
        date,
        liked,
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

    const handleCommentsClick = () => setView(view ? null : 'comments')

    return <article className="m-4 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={image} alt="" />

        <div className="flex flex-col justify-between p-4 leading-normal w-full">
            <p className="mb-3 font-normal text-gray-700">{text}</p>
        </div>
        <time>{getElapsedTime(date)} ago</time>

        <div className="flex flex-row p-4 gap-6 items-start w-full"> {/* para que estan en linea */}
            <button type="button" onClick={handleLikeClick}>
                {!liked ? <img className="w-6 h-6" src="./assets/heart.svg" /> : <img className="w-6 h-6" src="./assets/heart-full.svg" />}
            </button>

            <button type="button" onClick={handleCommentsClick}>
                <img className="w-6 h-6" src="./assets/comment.svg" />
            </button>
        </div>
        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}
    </article>

}