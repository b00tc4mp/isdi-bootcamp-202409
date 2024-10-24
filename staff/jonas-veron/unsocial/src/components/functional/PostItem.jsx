import { Button } from '../library'

import logic from '../../logic'

import './PostItem.css'

function PostItem({ item: { id, author, image, text, date, liked, likes }, onLikeClicked, onDeleted }) {
    const { userId } = sessionStorage
    return <article className="PostItem">
        <h4>{author.username}</h4>

        <img src={image}/>

        <p>{text}</p>

        <time>{date}</time>

        {userId === author.id &&
        <Button type="button" onClick={() => {
            const confirmDelete = window.confirm('Estas seguro de eliminar este post ?')

            if(confirmDelete) {
                logic.deletePost(id)
                onDeleted()
            }
        }}>Delete</Button>
    }

        <Button className="button" onClick={() => {
            logic.toggleLikePost(id)

            onLikeClicked()
        }}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}
        </Button>
    </article>
}

export default PostItem