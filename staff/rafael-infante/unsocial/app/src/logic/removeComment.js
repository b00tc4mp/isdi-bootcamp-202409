import { validate } from "./helpers"

export default (postId, commentId) => {

  validate.id(postId, 'postId')
  validate.id(commentId, 'commentId')

  const posts = JSON.parse(localStorage.posts)

  const post = posts.find(post => post.id === postId)

  const { comments } = post

  const index = comments.findIndex(comment => comment.id === commentId)

  if (index < 0) throw new Error('comment not found')

  const { author } = comments[index]

  if (author !== sessionStorage.loggedUserId) throw new Error('user is not found')

  comments.splice(index, 1)

  localStorage.posts = JSON.stringify(posts)
}