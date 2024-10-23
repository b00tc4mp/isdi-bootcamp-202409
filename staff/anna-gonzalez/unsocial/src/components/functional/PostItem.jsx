import { Button } from '../library'

import logic from '../../logic'

import './PostItem.css'

function PostItem({ item: { id, author, image, text, date, liked, likes }, onLikeClicked }) {
    return <article className="PostItem">
        <h4>{author.username}</h4>

        <img src={image} />

        <p>{text}</p>

        <time>{date}</time>

        {sessionStorage.loggedInUserId === author.id && <Button type="button" className="deleteButton" onClick={() => {
            deletePost()
            onDeleted()
        }}>Delete post</Button>}

        <Button className="likes-button" onClick={() => {
            logic.toggleLikePost(id)

            onLikeClicked()
        }}>{`${liked ? '❤️' : '🤍'} ${likes.length} likes`}</Button>
    </article>
}

export default PostItem