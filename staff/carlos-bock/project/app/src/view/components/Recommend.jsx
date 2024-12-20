import { useState } from 'react'
import { Link } from 'react-router-dom'
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
        console.log('Delete button clicked')
        confirm('¿Borrar recommendación o guía?', accepted => { //make alert dynamic on context
            console.log('Confirm dialog displayed')
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

    //const handleSubjectClick = () => handleSingleRecommendClick(id);


    console.log('Recommendation -> render')

    return <article className='bg-white border border-black rounded shadow-md mx-2 mb-3.5' >
        <h4 className='text-lg font-semibold bg-slate-600 text-white rounded-t p-1 '>{author.username}</h4>
        <div className='border-4 border-cardBorder p-4 bg-gray-100 rounded-md font-bold' >
            <Link to={`/recommend/${id}`} ><h4 >{subject} | {category === 1 ? 'trámites' : category === 2 ? 'servicios' :
                category === 3 ? 'alimentación' : category === 4 ? 'eventos' : category === 5 ? 'sanidad' :
                    category === 6 ? 'barrios' : category === 7 ? 'vivienda' : 'transporte'} |
                {price === 1 ? '€' : price === 2 ? '€€' : '€€€'}
            </h4></Link>

            <h5>{country} | {city}</h5>
        </div>
        <time className='text-gray-500 block'>Hacen {getElapsedTime(date)}</time>


        <Button onClick={handleUpVoteClick}>♥️{upVotes.length}</Button>

        <Button onClick={handleDownVoteClick}>❌{downVotes.length}</Button>

        {author.id === logic.getUserId() && <Button onClick={handleDeleteClick}>🗑️</Button>}

        <Button onClick={handleCommentsClick}>💬 {comments.length} </Button>

        {logic.isUserModerator() && <Button onClick={handleDeleteClick}>🧯</Button>}

        {view === 'comments' && <Comments
            recommendId={id}
            recommendText={text} //
            onAdded={onCommentAdded}
            onRemoved={onCommentRemoved}
        />}
        <br />
    </article>
}

