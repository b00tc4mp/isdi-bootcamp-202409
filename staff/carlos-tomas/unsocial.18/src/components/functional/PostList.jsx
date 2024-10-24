import './PostList.css'

import getPosts from '../../logic/getPosts'
import LikeUser from '../library/Likes'
import Button from '../library/Button'

function PostList(props) {
    console.log('PostList -> render')

    let posts

    try {
        posts = getPosts(props)
    } catch (error) {
        alert(error.message)

        console.error(error)
    }

    return <div className='PostList'>
        <h3>Posts</h3>

        {posts.map(post => <article className='PostList'>
            <h4>{post.author.username}</h4>
            <img src={post.image} style={{ width: '90%', margin: '5px' }} />
            {sessionStorage.loggedInUserId === post.author.id && <Button type="button" onClick={() => {
                posts = JSON.parse(localStorage.posts)

                let index = posts.findIndex(element => element.id === post.id)

                posts.splice(index, 1)

                localStorage.posts = JSON.stringify(posts)

                props.onDeleted()

            }} >Delete post </Button>}
            <LikeUser />


            <p>{post.text}</p>
            <time>{post.date}</time>
        </article>)}
    </div>
}

export default PostList