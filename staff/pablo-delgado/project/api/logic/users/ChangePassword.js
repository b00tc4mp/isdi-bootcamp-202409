import { User } from 'dat'
import { validate, errors } from 'com'
import bcrypt from 'bcryptjs'
import { SystemError, NotFoundError, ValidationError } from 'com'

export default (userId, currentPassword, newPassword) => {
    validate.id(userId, 'userId')  // Verificación de ID, antigua password y nueva
    validate.password(currentPassword, 'currentPassword') 
    validate.password(newPassword, 'newPassword')  

    return (async () => {
        let user

        try {
            // Busca al usuario en la base de datos
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)  // Maneja cualquier error de la base de datos
        }

        if (!user) {
            throw new NotFoundError('User not found')
        }

        // Verifica si la contraseña actual es correcta
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
            throw new ValidationError('Incorrect current password')  // Si la contraseña no es correcta, lanza un error
        }

        // Encripta la nueva contraseña antes de guardarla
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        // Actualiza la contraseña del usuario
        try {
            user.password = hashedPassword
            await user.save()  // Guarda los cambios en la base de datos
        } catch (error) {
            throw new SystemError('Error updating password')  
        }

        return 'Password changed successfully' 
    })()
}
