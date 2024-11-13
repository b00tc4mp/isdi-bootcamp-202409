import { Button } from '../library'
import logic from '../../logic'
import getElapsedTime from '../../utils/getElapsedTime'
import { errors } from 'com'

const { SystemError } = errors

export default ({ postId, comment: { id, author, text, date }, onRemoved }) => {
    console.log('Comment -> render')

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

    return <li>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>

        {logic.getUserId() === author.id && <Button className="no-style-button" onClick={handleRemove}>❌</Button>}
    </li>
}