import logic from '../../logic'

import Button from '../library/Button'

import './PostItem.css'

function PostItem({ item: { id, author, image, text, date, liked, likes }, onLikeClicked, onDeleted }) {
    return <article className="PostItem">

        {sessionStorage.userId === author.id &&
            <Button type="button"
                onClick={() => {
                    logic.deletePost(id)

                    onDeleted()

                }}>Delete Post</Button>}

        <p>Author:{author.username}</p>
        <img src={image} />
        <br />
        <button
            onClick={() => {
                logic.toggleLikePost(id)

                onLikeClicked()
            }}>{`${liked ? '❤️' : '🤍'} ${likes.length}`}</button>
        <button >💬</button>
        <label style={{ opacity: '60%', fontSize: '13px', marginTop: '2%' }}>View comments...</label>

        <h4 style={{ margin: '2%', marginLeft: '40px', fontSize: 'small' }}>{text}</h4>
        <time style={{ fontSize: 'xx-small', marginRight: '10px', marginTop: '2.5%' }}>{date}</time>

        <br />
    </article>
}

export default PostItem