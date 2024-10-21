const getPosts = () => {
  const posts = JSON.parse(localStorage.posts)
  const users = JSON.parse(localStorage.users)

  posts.forEach(post => {
    const { author: authorId } = post
    // const user = users.find(user => user.userId === authorId)
    const { username } = users.find((user) => user.userId === authorId)

    post.author = { id: authorId, username: username }
  });

  return posts.toReversed()
}

export default getPosts