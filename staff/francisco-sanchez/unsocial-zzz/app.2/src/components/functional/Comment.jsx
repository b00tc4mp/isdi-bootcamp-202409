import { Button } from "../library";
import logic from "../../logic";
import getElapsedTime from '../../utils/getElapsedTime'

import './Comments.css'


export default function Comment({ postId, comment: { id, author, text, date }, onRemoved }) {
    console.log('Comment -> render')

    const handleRemove = () => {
        if (confirm('Delete comment?'))
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

    return <li>
        <span className="author">{author.username}</span>
        <span className="commentText">{text}</span>
        <time>{getElapsedTime(date)}</time>
        {logic.getUserId() === author.id && <Button className="deleteButton" onClick={handleRemove}>🗑️</Button>}
    </li>
}