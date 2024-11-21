import { Button } from '../library'

import logic from '../../logic'

import { errors } from 'apu'

const { SystemError } = errors

import { getElapsedTime } from '../../util'

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

    return <li className="mb-4">
        <div className="flex justify-between">
            <h5 className="my-2">{author.username}</h5>
            {logic.getUserId() === author.id && <Button classname="w-6" onClick={handleRemove}>❌</Button>}
        </div>

        <p className="pl-8">{text}</p>

        <time className="pl-2">{getElapsedTime(date)}</time>
    </li>
}