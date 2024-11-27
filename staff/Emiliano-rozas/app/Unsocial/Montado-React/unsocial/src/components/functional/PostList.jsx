import getPosts from '../../logic/getPosts'
import LikeButton from '../../components/library/LikeButton'
import deletePost from '../../logic/DeletePost'
import Button from '../library/Button'


function PostList(props) {
    console.log("PostList -> render")

    let posts

    try {
        posts = getPosts()
    } catch (error) {
        alert(error.message)

        console.error(error)
    }
    return <div>
        <h3> Posts</h3>

        {posts.map(post => <article className='postArticle'>
            <h4>{post.author.username}</h4>
            <img src={post.image} />
            <p>{post.text}</p>
            <time>{post.date}</time>
            <div className='contenedorBotones'>
                {sessionStorage.loggedInUserId === post.author.id &&
                    <Button type="button" onClick={() => {
                        const confirmLogout = window.confirm("¿Are you sure you want to delete this post?")

                        if (confirmLogout) {
                            deletePost(post)
                            props.onDeleted()
                        }
                    }}>🗑️</Button>}

                <LikeButton postData={post} loggedInUserId={sessionStorage.loggedInUserId} />


                <span className='showComents' onClick={(event) => {
                    const comentBox = event.target.nextElementSibling
                    comentBox.style.display = comentBox.style.display === "none" ? "flex" : "none"
                }}>💬</span>

                <div className='comentBox'>
                    <form >
                        <textarea name="comment" placeholder="Add a coment..."></textarea>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </article>)
        }


    </div >
}

export default PostList
