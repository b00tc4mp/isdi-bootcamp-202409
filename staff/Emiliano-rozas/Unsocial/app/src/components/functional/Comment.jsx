import { Button } from '../library'

import logic from '../../logic'

import getElapsedTime from '../../utils/getElapsedTime'


export default function comments({ postId, comment: { id, author, text, date }, onRemoved }) {
    console.log('AddComment -> render')

    const handleRemove = () => {
        if (confirm('Delete comment?'))
            try {
                logic.removeComments(postId, id)
                    .then(onRemoved)
                    .catch(error => {
                        alert(error.message)

                        console.log(error)
                    })
            } catch (error) {
                alert(error.message)

                console.log(error)
            }
    }


    return <section class="align-center p-5 max-w-[400px] mx-auto mt-12 mb-12 bg-[#dcd7d7] rounded-[10px] shadow-md w-full box-border">

        <li>
            <h4>{author.username}</h4>

            <p>{text}</p>

            <time>{getElapsedTime(date)}</time>

            {logic.getUserId() === author.id && <Button onClick={handleRemove}>🗑️</Button>}
        </li>
    </section >

}