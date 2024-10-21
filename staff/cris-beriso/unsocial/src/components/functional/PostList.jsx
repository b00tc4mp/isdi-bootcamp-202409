import getPosts from '../../logic/getPosts'

function PostList(props) {
  console.log('PostList -> render')

  let posts

  try {
    posts = getPosts()
  } catch (error) {
    alert(error.message)

    console.error(error)
  }

  return <div>
    <h3>Posts</h3>

    {posts.map(post => <article>
      <h4>{post.author.username}</h4>
      <img src={post.image} style={{ width: '100%' }} />
      <p>{post.text}</p>
      <time>{post.date}</time>
      {sessionStorage.loggedInUserId === post.author.id && <button type="button" onClick={() => {

        posts = JSON.parse(localStorage.posts)

        let index = posts.findIndex(element => element.id === post.id)

        posts.splice(index, 1)

        localStorage.posts = JSON.stringify(posts)
        props.onDeleted()
      }}>Delete</button>
      }

    </article>)}
  </div>
}

export default PostList

