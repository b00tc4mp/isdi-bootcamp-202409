import { Button } from '../library'

import logic from '../../logic'

import dateAgo from '../../utilities/dateAgo'

export default ({ postId, comment: { id, author, text, date }, onRemoved }) => {

    const handleRemove = () => {
        if (confirm('Delete comment?'))
            try {
                logic.removeComment(postId, id)//TODO falta crear logica e importarla

                onRemoved()
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
    }

    return <li>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{dateAgo(date)}</time>

        {logic.getUserId() === author.id && <Button onClick={handleRemove}>🗑️</Button>}
    </li>
}