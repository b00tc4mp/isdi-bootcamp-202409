import { storage } from '../data/index.js'

export default userId => {
  const { users, posts } = storage

  posts.forEach(post => {
    const { author: authorId } = post

    const { username } = users.find(({ id }) => id === authorId)

    post.author = { id: authorId, username }

    post.liked = post.likes.includes(userId)

    posts.comments = post.comments.length
  })

  return posts.toReversed()
}