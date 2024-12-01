const getPosts = () => {
  const posts = JSON.parse(localStorage.posts)
  const users = JSON.parse(localStorage.users)

  const { loggedUserId } = sessionStorage

  posts.forEach(post => {
    const { author: authorId } = post
    // const user = users.find(user => user.userId === authorId)
    const { username } = users.find((user) => user.userId === authorId)
    // const { username } = users.find(({ id }) => id === authorId)

    post.author = { id: authorId, username: username }

    post.liked = post.likes.includes(loggedUserId)

  });

  return posts.toReversed()
}

export default getPosts