import { Button } from '../library'
import './Comment.css'
import logic from '../../logic'

import dateAgo from '../../utilities/dateAgo'

export default function Comment({ postId, comment: { id, author, text, date }, onRemoved }) {

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

                alert(error.message)
                console.error(error)
            }
    }

    return <section>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{dateAgo(date)} ago...</time>

        {logic.getUserId() === author.id && <Button onClick={handleRemove}>🗑️</Button>}
    </section>
}