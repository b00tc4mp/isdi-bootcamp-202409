import { Button } from '../library'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

export default ({ postId, comment: { id, author, text, date}, onRemoved}) => <li>
    <h4>{author.username}</h4>

    <p>{text}</p>

    <time>{getElapsedTime(date)}</time>

    {logic.getUserId() === author.id && <Button onClick={() => {
        if (confirm('Delete comment?'))
            try { 
        logic.removeComment(postId, id)

                onRemoved()
        } catch (error) {
            alert(error.message)

            console.error(error)
        }
    }}>🗑️</Button>}
</li>