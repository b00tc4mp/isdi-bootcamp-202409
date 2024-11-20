import { Button } from '../library'

import logic from '../../logic'

import { errors } from 'apu'

const { SystemError } = errors

import { getElapsedTime } from '../../util'

import './Comment.css'

export default ({ postId, comment: { id, author, text, date }, onRemoved }) => {
    const handleRemove = () => {
        if (confirm('Delete comment?'))
            try {
                logic.removeComment(postId, id, error => {
                    if (error) {
                        if (error instanceof SystemError)
                            alert('Sorry, try again later')
                        else
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

    return <li className="Comment">
        <div className="username-delete">
            <h5>{author.username}</h5>
            {logic.getUserId() === author.id && <Button classname="remove-comment" onClick={handleRemove}>❌</Button>}
        </div>

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>
    </li>
}