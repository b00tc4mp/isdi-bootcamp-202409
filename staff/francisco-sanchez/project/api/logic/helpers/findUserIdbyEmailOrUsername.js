import { /* validate, */ errors, validate } from 'com'

import { User } from 'dat';

const { SystemError, NotFoundError } = errors

export default async (userId, searchTerm) => {
    validate.id(userId)
    validate.text(searchTerm, 'searchTerm')

    // Busca el usuario principal por ID
    const user = await User.findById(userId).lean();
    //if (!user) throw new NotFoundError("User not found");

    // Busca el usuario objetivo por email
    let targetUser = await User.findOne({ email: searchTerm }).lean();

    if (targetUser) {
        // Si se encontró por email, devuelve el resultado inmediatamente
        return targetUser._id;

    } else {

        // Busca el usuario objetivo por email
        targetUser = await User.findOne({ username: searchTerm }).lean();

        if (targetUser) {
            // Si se encontró por username, devuelve el resultado
            return targetUser._id;
        }

        //throw new NotFoundError('Error, username or email not found')
        return
    }
}
