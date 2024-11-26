import { Button } from '../library'
import logic from '../../logic'
import { getElapsedTime } from '../../util'
import { errors } from 'com'
import useContext from '../useContext'

const { SystemError } = errors

export default function Comment({ postId, comment: { id, author, text, date }, onRemoved }) {
    console.log('Comment -> render')

    const { alert, confirm } = useContext()

    const handleRemove = () => {
        confirm('Delete comment?', accepted => {
            if (accepted) {
                try {
                    logic.removeComment(postId, id)
                        .then(onRemoved)
                        .catch(error => {
                            if (error instanceof SystemError)
                                alert('Sorry, try again later')
                            else
                                alert(error.message)

                            console.error(error)
                        })
                } catch (error) {
                    alert(error.message)

                    console.error(error)
                }
            }
        })
    }

    return <li>
        <h4>{author.username}</h4>

        <p>{text}</p>

        <time>{getElapsedTime(date)}</time>

        {logic.getUserId() === author.id && <Button className="no-style-button" onClick={handleRemove}>❌</Button>}
    </li>
}