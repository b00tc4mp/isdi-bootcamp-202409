const getPosts = () => {
  const users = JSON.parse(localStorage.users)
  const posts = JSON.parse(localStorage.posts)

  posts.forEach(post => {
    const { author: authorId } = post

    // const user = users.find(user=> user.id === authorId)
    // const user = users.find(({id}) => id === authorId)

    const { username } = users.find(({ id }) => id === authorId)

    //post.author = {id: authorId, username: username}
    post.author = { id: authorId, username }
  })

  return posts.toReversed()
}

export default getPosts