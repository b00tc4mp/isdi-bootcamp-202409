import { /* validate, */ errors } from 'com'
import getUserByEmail from './getUserByEmail.js'
import getUserByUsername from './getUserByUsername.js'

const { SystemError, NotFoundError } = errors

export default async (userId, searchTerm) => {
    //let customerUserId

    try {
        // Intenta buscar por email
        const customerUserIdByEmail = await getUserByEmail(userId, searchTerm);

        /* customerUserId = getUserByEmail(userId, searchTerm)
        if (customerUserId) {
            return customerUserId
        } */

        if (customerUserIdByEmail) {
            // Si se encontró por email, devuelve el resultado inmediatamente
            return customerUserIdByEmail;
        }

    } catch (error) {

        // Solo registramos el error de email si es relevante (opcional)
        if (!(error instanceof NotFoundError)) {
            console.error('Error while searching by email:', error.message);
        }
    }


    try {

        // Si no se encontró por email, busca por username
        const customerUserIdByUsername = await getUserByUsername(userId, searchTerm);

        if (customerUserIdByUsername) {
            // Si se encontró por username, devuelve el resultado
            return customerUserIdByUsername;
        }

        /* customerUserId = getUserByUsername(userId, searchTerm)
        if (customerUserId) {
            return customerUserId
        } */
    } catch (error) {

        // Solo registramos el error de username si es relevante (opcional)
        if (!(error instanceof NotFoundError)) {
            console.error('Error while searching by username:', error.message);
        }

        /* throw new SystemError(error.message)
    }

    throw new NotFoundError('Customer not found.')
 */
    }

    // Si no se encontró ni por email ni por username, arroja un error
    throw new NotFoundError('Customer not found.');

}
