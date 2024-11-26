import { Button } from '../library'

import logic from '../../logic'

import { getElapsedTime } from '../../util'

export default function Comment({ postId, comment: { id, author, text, date }, onRemoved, }) {
    console.log('Comment -> render')

    const handleRemove = () => {
        if (confirm('Delete comment?'))
            try {
                logic.removeComment(postId, id)
                    .then(onRemoved)
                    .catch(error => {
                        alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert.error(error)

                console.error(error)
            }
    }

    return <li>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>

        {logic.getUserId() === author.id && <Button onClick={handleRemove}>🗑️</Button>}

    </li>
}

