import { Button } from '../library'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'

export default ({ postId, comment: { _id, author, text, date }, onRemoved }) => {
    console.log('Comment -> render')

    const handleRemove = () => {
        if (confirm('Delete comment?'))
            try {
                logic.removeComment(postId, _id, error => {
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

    return <li>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>

        {logic.getUserId() === author._id && <Button className="no-style-button" onClick={handleRemove}>❌</Button>}
    </li>
}