import { User, Provider } from 'dat' 
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

export default userId => {
  // Validar el ID del usuario
  validate.id(userId, 'userId')

  return User.findById(userId).lean()
    .catch(error => { throw new SystemError(error.message) })
    .then(user => {
      if (!user) throw new NotFoundError('user not found')

      const { favorites } = user // Campo que almacena los IDs de proveedores favoritos

      // Resolver todos los proveedores favoritos
      return Promise.all(
        favorites.map(providerId => 
          Provider.findById(providerId).lean() // Buscar el proveedor por ID
            .catch(() => { throw new NotFoundError('provider not found') })
            .then(provider => {
              provider.id = provider._id.toString()
              delete provider._id

              const { likes, dislikes } = provider

              // Determinar si el usuario ha dado like o dislike al proveedor
              provider.liked = likes.some(userObjectId => userObjectId.equals(userId))
              provider.likes = likes.length

              provider.disliked = dislikes.some(userObjectId => userObjectId.equals(userId))
              provider.dislikes = dislikes.length

              return provider
            })
        )
      )
    })
}
