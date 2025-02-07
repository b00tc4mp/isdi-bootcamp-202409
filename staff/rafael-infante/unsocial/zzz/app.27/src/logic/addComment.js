import uuid from "../data/uuid";

export default (postId, text) => {

  const posts = JSON.parse(localStorage.posts)
  const post = posts.find(({ id }) => id === postId)

  if (!post) throw new Error('post not found')

  post.comments.push({
    id: uuid(),
    author: sessionStorage.loggedUserId,
    text,
    date: new Date
  })

  localStorage.posts = JSON.stringify(posts)

}