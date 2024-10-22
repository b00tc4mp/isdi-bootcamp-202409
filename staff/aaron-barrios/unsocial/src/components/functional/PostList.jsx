import getPosts from "../../logic/getPosts"

import Button from "../library/Button"
import Field2 from '../library/Field2'

function PostList(props) {
    console.log('PostList -> render')

    let posts

    try {
        posts = getPosts()
    } catch (error) {

        alert(error.message)

        console.error(error)
    }

    return <div id="posts">
        <h3>Posts</h3>

        {posts.map(post => <article>
            {sessionStorage.loggedInUserId === post.author.id && <Button type="button"
                onClick={() => {

                    posts = JSON.parse(localStorage.posts)

                    let index = posts.findIndex(element => element.id === post.id)

                    posts.splice(index, 1)

                    localStorage.posts = JSON.stringify(posts)

                    props.onDeleted()

                }}>Delete Post</Button>}

            <h4>Title: {post.text}</h4>
            <label>Author:{post.author.username}</label>
            <img src={post.image} style={{ width: '80%', height: '50%' }} />
            <br />
            <Field2>
                <button style={{ marginRight: '260px' }}>❤️</button>
                <button style={{ marginRight: '250px' }}>+</button>
            </Field2>
            <time>{post.date}</time>
            <p></p>
        </article>)}
    </div>
}

export default PostList