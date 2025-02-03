import db from 'dat'

import { validate, errors } from 'com'

const { ObjectId } = db
const { SystemError, NotFoundError } = errors

export default (userId, postId) => {
    validate.id(userId, 'userId')
    validate.id(postId, 'postId')

    const userObjectId = new ObjectId(userId)
    const postObjectId = new ObjectId(postId)

    const { users, posts } = db

    return Promise.all([
        users.findOne({ _id: userObjectId }),
        posts.findOne({ _id: postObjectId })
    ])


        .catch(error => { throw new SystemError(error.message) })
        .then(([user, post]) => {
            if (!user) throw new NotFoundError('user not found')
            if (!post) throw new NotFoundError('post not found')

            const { comments } = post

            //Declaramos un array para guardar los autores
            const authorObjectIds = []

            //Nos traemos todos los id de autores
            comments.forEach(comment => {
                const { author } = comment

                const found = authorObjectIds.some(authorObjectId => authorObjectId.equals(author))

                //De esta manera conseguimos que no tenga que buscar varias veces a cada autor en caso de eestar más de una vez
                if (!found) authorObjectIds.push(author)

            })
            //Luego podemos buscar todos los autores dentro de los posts, 
            //así evitamos buscar varias veces el nombre de usuario de un mismo autor
            //Tenemos que hacer una projection (((( ¡¡¡¡¡ Que no se que es y tengo que entender !!!!! ))))
            return users.find({ _id: { $in: authorObjectIds } }, { projection: { username: 1 } }).toArray()
                .catch(error => { throw new SystemError(error.message) })
                .then(authors => {
                    comments.forEach(comment => {
                        comment.id = comment._id.toString()
                        delete comment._id

                        const author = authors.find(({ _id }) => _id.equals(comment.author))

                        const { _id, username } = author

                        comment.author = {
                            id: _id.toString(),
                            username
                        }
                    })

                    return comments
                })
        })
}

/* return db.users.findOne({ _id: objectUserId })
    .catch(error => { throw new Error(error.message) })
    .then(user => {
        if (!user) throw new Error('user not found')

        return db.posts.findOne({ _id: objectPostId })
            .catch(error => { throw new Error(error.message) })
    })

    .then(post => {
        if (!post) throw new Error('post not found') */



/* const { comments } = post

const promises = comments.map(comment => {
    return db.users.findOne({ _id: comment.author })
        .catch(error => { throw new Error(error.message) })
        .then(user => {
            if (!user) throw new Error('author of comment not found')

            const { username } = user

            const { author: authorId } = comment

            comment.id = comment._id.toString()
            delete comment._id

            comment.author = { id: authorId.toString(), username }

            return comment
        })
})
return Promise.all(promises)

})

} */