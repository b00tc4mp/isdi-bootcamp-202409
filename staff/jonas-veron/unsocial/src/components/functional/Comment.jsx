import { Button } from '../library'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

import './Comment.css'

export default ({ postId, comment: { id, author, text, date }, onRemoved }) => {
    console.log('Comment -> render')

    const handleRemove = () => {
        if (confirm('Delete comment?'))
            try {
                logic.removeComment(postId, id)

                onRemoved()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
    }

    return <li>
        <div className="UsernameComments">
            <h4>{author.username}</h4>
            <time>{getElapsedTime(date)}</time>
        </div>
        <p>{text}</p>


        {logic.getUserId() === author.id && <Button onClick={handleRemove}>🗑️</Button>}
    </li>
}