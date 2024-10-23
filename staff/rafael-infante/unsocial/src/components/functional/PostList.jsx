import getPosts from "../../logic/getposts"

function PostList() {

  let posts

  try {
    posts = getPosts()
  } catch (error) {
    alert(error.message)
    console.error(error)
  }
  return (
    <div>
      {posts.map(post => {
        return (
          <article>
            <h4>{post.author.username}</h4>
            <img src={post.image} className="boy" />
            <p>{post.text}</p>
            <time>{post.date}</time>
          </article>
        )
      })}
    </div>
  )
}

export default PostList