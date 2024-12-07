import { useState } from 'react'

import { Button } from '../library/index.js'
import Comments from './Comments.jsx'

import logic from '../../logic/index.js'

import getElapsedTime from '../../util/getElapsedTime.js'

import useContext from '../useContext.js'

//create and import a stylesheet

export default function Recommend({ recommend, onUpVote, onDownVote, onDeleted, onCommentAdded, onCommentRemoved }) {
    const [view, setView] = useState(null)

    const { alert, confirm } = useContext()

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

    const handleUpVoteClick = () => {
        try {
            logic.upVoteToggle(id)
                .then(onUpVote)
                .catch(error => {
                    alert(error.message)

                    console.error(error)
                })
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }

    const handleDownVoteClick = () => {
        try {
            logic.downVoteToggle(id)
                .then(onDownVote)
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
    //        <p>{text}</p>
    //        <img src={image} />

    return <article className='Recommendation border border-black p-4' >
        <h4 className='bg-indigo-500'>{author.username}</h4>
        <div className='border-4 border-black p-1.25 bg-gray-100'>
            <h4>{subject} | {category === 1 ? 'trámites' : category === 2 ? 'servicios' :
                category === 3 ? 'alimentación' : category === 4 ? 'eventos' : category === 5 ? 'sanidad' :
                    category === 6 ? 'barrios' : category === 7 ? 'vivienda' : category === 8 ? 'transporte' : ''} |
                {price === 1 ? '€' : price === 2 ? '€€' : price === 3 ? '€€€' : ''}
            </h4>

        </div>
        <time>Hacen {getElapsedTime(date)}</time>
        <br />
        <Button onClick={handleUpVoteClick}>♥️{upVotes.length}</Button>
        <Button onClick={handleDownVoteClick}>❌{downVotes.length}</Button>

        {author.id === logic.getUserId() && <Button onClick={handleDeleteClick}>🗑️</Button>}

        <Button onClick={handleCommentsClick}>💬 {comments} </Button>

        {logic.isUserModerator() && <Button>🧯</Button>}

        {view === 'comments' && <Comments
            recommendId={id}
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}
    </article>
}

