import { models } from "dat"
import { validate, errors } from "com"

const { User, Post } = models
const { SystemError, NotFoundError } = errors

export default userId => {
  validate.id(userId, 'userId')

  return Promise.all([
    User.findById(userId).lean(),
    Post.find().populate('author', 'username').sort({ date: -1 }).lean()
  ])
    .catch(error => { throw new SystemError(error.message) })
    .then(([user, posts]) => {
      if (!user) throw new NotFoundError('user not found')

      posts.forEach(post => {
        post.id = post._id.toString()
        delete post._id

        if (post.author._id) {
          post.author.id = post.author._id.toString()
          delete post.author._id
        }

        const { likes, comments } = post

        post.liked = likes.some(userObjectId => userObjectId.equals(userId))
        post.likes = likes.length

        post.comments = comments.length
      })

      return posts
    })

  // db.users.findOne({ _id: new ObjectId(userId) })
  //   .catch(error => { throw new SystemError(error.message) })
  //   .then(user => {
  //     if (!user) throw new NotFoundError('user not found')

  //     return db.posts.find().sort({ date: -1 }).toArray()
  //       .catch(error => { throw new SystemError(error.message) })
  //   })
  //   .then(posts => {

  //     const promises = posts.map(post =>
  //       db.users.findOne({ _id: post.author }, { projection: { username: 1 } }) // projection
  //         .then(user => {
  //           if (!user) throw new NotFoundError('author of post not found')

  //           const { username } = user
  //           // sanitize
  //           post.id = post._id.toString()
  //           delete post._id

  //           post.author = { id: post.author.toString(), username }

  //           const { likes, comments } = post

  //           post.liked = likes.some(objectUserId => objectUserId.equals(userId))
  //           post.likes = likes.length

  //           post.comments = comments.length

  //           return post
  //         })
  //     )

  //     return Promise.all(promises)
  //   })
}