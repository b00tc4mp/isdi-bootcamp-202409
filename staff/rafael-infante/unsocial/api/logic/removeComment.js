import { validate } from "./helpers/index.js"
import { storage } from "../data/index.js"

export default (userId, postId, commentId) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')
  validate.id(commentId, 'commentId')

  const { users, posts } = storage

  const found = users.some(({ id }) => id === userId)

  if (!found) throw new Error('user not found')

  const post = posts.find(post => post.id === postId)

  const { comments } = post

  const index = comments.findIndex(comment => comment.id === commentId)

  if (index < 0) throw new Error('comment not found')

  const { author } = comments[index]

  if (author !== userId) throw new Error('user is not author of the comment')

  comments.splice(index, 1)

  storage.posts = posts
}