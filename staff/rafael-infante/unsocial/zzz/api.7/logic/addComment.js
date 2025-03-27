import { models } from 'dat'
import { validate, errors } from 'com'

const { User, Post, Comment } = models
const { SystemError, NotFoundError } = errors

export default (postId, text, userId) => {
  validate.id(postId, 'postId')
  validate.id(userId, 'userId')
  validate.text(text)

  return Promise.all([
    User.findById(userId),
    Post.findById(postId)
  ])
    .catch(error => { throw new SystemError(error.message) })
    .then(([user, post]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!post) throw new NotFoundError('post not found')

      const comment = new Comment({
        author: userId,
        text,
        date: new Date
      })

      post.comments.push(comment)

      return post.save()
        .catch(error => { throw new SystemError(error.message) })
    })
    .then(_ => { })
}