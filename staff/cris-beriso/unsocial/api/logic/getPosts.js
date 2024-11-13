import db from 'dat'
import { models } from 'dat'
import { validate, errors } from 'com'

const { ObjectId } = db
const { User, Post } = models
const { SystemError, NotFoundError } = errors

export default userId => {
  validate.id(userId, 'userId')

  return User.findOne({ _id: new ObjectId(userId) })
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

      return Post.find({}).sort({ date: -1 }).lean()
        .catch((error) => { throw new SystemError(error.message) })
    })
    .then(posts => {
      const promises = posts.map(post =>
        User.findOne({ _id: post.author }, { _id: 0, username: 1 }) //queremos encontrar el author pero solo el username del author (projection) 
          .catch(error => { throw new SystemError(error.message) }) // por si falla mongo. 
          .then(user => { //Traemos solo {_id, username}, no todas las propiedades de los users.
            if (!user) throw new NotFoundError('author of post not found')

            const { username } = user

            //aprovechamos post en vez de crear un objeto nuevo & sanitize
            post.id = post._id.toString()
            delete post._id

            post.author = { id: post.author.toString(), username }

            const { likes, comments } = post

            post.liked = likes.some(userObjectId => userObjectId.equals(userId)) //permite buscar objetos, el includes solo sirve par aprimitivos

            post.likes = likes.length

            post.comments = comments.length

            return post
          })
      )

      return Promise.all(promises)
    })
}
