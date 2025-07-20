import Button from '../library/Button.jsx'
import getElapsedTime from '../../util/getElapsedTime.js'
import logic from '../../logic/index.js'

export default function Comment({ recommendId, comment: { id, author, text, date }, onRemoved }) {
    console.log('Comment -> render')

    const handleRemove = () => {
        if (confirm('¿Borrar recomendación?')) //TODO dynamic inner text based on category of recommend
            try {
                onRemoved(id)
            } catch (error) {
                alert(error.message)

                console.error(error)
            }
    }

    return <li className='mt-6 px-5 w-full h-fit'>
        <h4 className='font-extrabold'>{author.username}</h4>
        <p>{text}</p>
        <time>{getElapsedTime(date)}</time>
        {logic.getUserId() === author.id && <Button onClick={handleRemove}>🗑️</Button>}
    </li>
}
