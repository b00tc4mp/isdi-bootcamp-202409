import { storage } from "../data/index.js"
import { validate } from "../logic/helpers/index.js"

export default userId => {
  validate.id(userId, 'userId')
  const { posts, users } = storage

  const user = users.find(({ id }) => id === userId)

  if (!user) throw new Error('user not found')

  posts.forEach(post => {
    const { author: authorId } = post

    const { username } = users.find(({ id }) => id === authorId)

    post.author = { id: authorId, username: username }

    post.liked = post.likes.includes(userId)

    post.comments = post.comments.length

  });

  return posts.toReversed()
}