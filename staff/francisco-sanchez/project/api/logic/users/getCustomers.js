import { User } from 'dat';
import { errors } from 'com';
import { use } from 'chai';

const { SystemError, NotFoundError } = errors;

export default (userId, targetUserId) => {
    console.log("----> " + userId)

    return User.findById(targetUserId)
        .lean() // Usamos `.lean()` para convertir los documentos de Mongoose en objetos JavaScript simples.
        .then(user => {
            console.log('Fetched user target:', targetUserId)
            console.log('Fetched user:', userId)
            //Este return lo tenemos que poner porqué sinó el segundo .then falla
            return user.customers.map(customerId => customerId); // Mapea los ObjectIds a strings
        })
        .catch(error => {
            throw new SystemError(error.message)
        })


    /*         .then(user => {
                console.log('Customers:', user.customers)
    
                console.log('User document:', JSON.stringify(user, null, 2)); // Ve todo el documento en formato legible
                return user.customers ? user.customers : [];
            
            }) */


    /* 
                          if (!user.customers || user.customers.length === 0) throw new NotFoundError('No customers found for this userId')
              
                          user.forEach(user => {
                              user.id = user._id.toString()
                              delete user._id
                          })
                          return user */



    /* return User.find({ user: userId })
        .lean()
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found');
            }

            if (!user.customers || user.customers.length === 0) {
                throw new NotFoundError('No customers found for this user');
            }
            return user.customers.map(customerId => customerId.toString()); // Mapea los ObjectIds a strings
        })

        .catch(error => {
            // Si el error ya es de tipo NotFoundError, lo dejamos pasar
            if (error instanceof NotFoundError) {
                throw error;
            }

            throw new SystemError(error.message);
        }); */
};
