import getPosts from '../../logic/getPosts'
import deletePost from '../../logic/deletePost'


function PostList(props) {
    let posts

    try{
        posts = getPosts()
    
    } catch (error) {
        alert(error.message)

        console.error(error)
    }

    return <div>

        <h3>Posts</h3>

        {posts.map(post => <article>
            <h4>{post.author.username}</h4>
            <img src={post.image} style={{width: '100%'}} />
            <p>{post.text}</p>
            <time>{post.date}</time>
            <div>
                <h3>Comments</h3>
                <section>

                </section>
                <textarea name="" id=""></textarea>
                <button type="button">Send</button>
            </div>

                {sessionStorage.loggedInUserId === post.author.id && <button type="button" onClick={() => {
                            deletePost(post)
                            props.onDeleted()
                }  }>Delete post</button>
                }
        </article>)}
    </div>
}

export default PostList