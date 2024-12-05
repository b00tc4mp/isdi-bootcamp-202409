import { useState } from 'react'
import { Button } from '../library'
import logic from '../../logic'
import { timeAgo } from '../../util'
import useContext from '../useContext'

export default function Note({ note, onDeleted }) {
    const { alert, confirm } = useContext()
    const { view, setView } = useState(null)

    const { id, author, date, text } = note

    const handleDeleteClick = () => {
        confirm('Delete note?', accepted => {
            if (accepted) {
                try {
                    logic.deleteNote(id)
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
    return <article className='Note'>
        <h4>{author.username}</h4>
        <p>{text}</p>
        <time>{timeAgo(date)} ago.</time>
        <Button onClick={handleDeleteClick}>❌</Button>
    </article>
}