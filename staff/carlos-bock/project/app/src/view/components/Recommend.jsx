import { useState } from 'react'

import { Button } from '../library/index.js'
import Comments from './Comments.jsx'

import logic from '../../logic/index.js'

import getElapsedTime from '../../util/getElapsedTime.js'

//import useContext from '../useContext.js' add for alerts

//create and import a stylesheet

export default function Recommend({ recommend, onDeleted, onCommentAdded, onCommentRemoved }) {
    const [view, setView] = useState(null)

    //TODO custom alert with useContext

    const {
        id,
        author,
        image,
        text,
        date,
        upVotes,
        downVotes,
        comments,
        country,
        city,
        category,
        price,
        subject
    } = recommend

    const handleDeleteClick = () => {
        confirm('¿Borrar recommendación o guía?', accepted => { //make alert dynamic on context
            if (accepted) {
                try {
                    logic.deleteRecommend(id)
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

    console.log('Recommendation -> render')

    return <article className='Recommendation'>
        <h4>{author.username}</h4>
        <h4>{price}</h4>
        <h5 id='subject'>{ }</h5>
        <p>{subject}</p>
        <p>{text}</p>

        <img src={image} />

        <time>Hacen {getElapsedTime(date)}</time>

        <Button>♥️{upVotes.length}</Button>
        <Button>❌{downVotes.length}</Button>

        {author.id === logic.getUserId() && <Button onClick={handleDeleteClick}>🗑️</Button>}

        <Button onClick={handleCommentsClick}>💬 {comments} commentarios</Button>

        {logic.isUserModerator() && <Button>🧯</Button>}

        {view === 'comments' && <Comments
            postId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}
    </article>
}

