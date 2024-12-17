import { Button } from '../library'

import logic from '../../logic'

import { getElapsedTime } from '../../util'

export default function Comments({ postId, comment: { id, author, text, date }, onRemoved }) {
    console.log('Comment -> render')

    const handleRemoveClick = () => {
        if (confirm('Delete comment?'))
            try {
                logic.removeComment(postId, id)
                    .then(onRemoved)
                    .catch(error => {
                        alert(error.message)

                        console.error(error)
                    })
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
    }

    return <li>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>

        {logic.getUserId() === author.id && <button type="button" onClick={handleRemoveClick}>
            <img className="w-6 h-6" src="./assets/remove.svg" />
        </button>}
    </li>
}