// import { Button } from '../library'

import logic from '../../logic'

import { getElapsedTime } from '../../util'

export default function Comment({ postId, comment: { id, author, text, date }, onRemoved }) {
    const handleRemove = () => {
        if (confirm('Delete Comment?')) {
            try {
                logic.removeComment(postId, id, error => {
                    if (error) {
                        alert(error.message)

                        console.error(error)

                        return
                    }
                    onRemoved()
                })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
        }
    }

    return <li>
        <h5>{author.username}</h5>
        <h6>{text}</h6>
        <time>{getElapsedTime(date)}</time>
        <p></p>
        {logic.getUserId() === author.id && <button onClick={handleRemove}>❌</button>}
    </li>
}
