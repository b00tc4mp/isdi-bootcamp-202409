import { User, Post } from 'dat'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default (userId, image, text) => {
    validate.id(userId, 'userId')
    validate.image(image)
    validate.text(text)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            //Si encontramos el usuario ya podemos insertar
            return Post.create({
                author: userId,
                image: image,
                text: text,
                date: new Date,
                likes: [],
                comments: []
            })
                .catch(error => {
                    throw new SystemError(error.message)
                })

                .then(_ => { })
        })

}