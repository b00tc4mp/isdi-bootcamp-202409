import { models } from 'dat'
import { validate, errors } from 'com'

const { User, Post } = models
const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
  validate.id(userId, 'userId')
  validate.id(postId, 'postId')

  return Promise.all([
    User.findById(userId).lean(),
    Post.findById(postId) //si hacemos lean aqui, post no es un modelo, sino un documento y no podríamos hacer save.
  ])
    .catch(error => { throw new SystemError(error.message) })
    .then(([user, post]) => {
      if (!user) throw new NotFoundError('user not found')
      if (!post) throw new NotFoundError('post not found')

      const { likes } = post

      const index = likes.findIndex(userObjectId => userObjectId.equals(userId))

      if (index < 0) //en este if mutamos el array de datos 
        likes.push(userId)
      else
        likes.splice(index, 1)

      return post.save() //aqui salvamos los cambios realizados
        .catch(error => { throw new SystemError(error.message) })
    })
    .then(_ => { })
}