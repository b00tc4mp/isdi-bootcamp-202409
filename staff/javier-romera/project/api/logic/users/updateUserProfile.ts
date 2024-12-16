import bcrypt from 'bcryptjs'

import { User } from 'dat'
import { validate, errors } from 'com'
const { NotFoundError, DuplicityError, ValidationError, SystemError } = errors
import { MongoError } from 'mongodb'

export default (userId: string, username: string | undefined, email: string | undefined, oldPassword: string | undefined, newPassword: string | undefined, newPasswordRepeat: string | undefined): Promise<void> => {
    validate.id(userId, 'userId')
    validate.updateProfile(username, email, oldPassword, newPassword, newPasswordRepeat)
    username && validate.username(username)
    email && validate.email(email);
    (oldPassword || newPassword || newPasswordRepeat) && validate.passwordUpdate(oldPassword, newPassword, newPasswordRepeat)

    return (async (): Promise<void> => {
        let user, hash, oldPasswordMatch

        try {
            user = await User.findById(userId)
        } catch (error) {
            throw new SystemError((error as Error).message)
        }

        if (!user) throw new NotFoundError('user not found')

        if (username === user.username) throw new DuplicityError('This is your present username')
        if (email === user.email) throw new DuplicityError('This is your present email')

        if (oldPassword) {
            try {
                oldPasswordMatch = await bcrypt.compare(oldPassword, user.password)
            } catch (error) {
                throw new SystemError((error as Error).message)
            }

            if (!oldPasswordMatch) throw new ValidationError('Incorrect old password match')
            if (newPassword === oldPassword) throw new ValidationError('Your new password can\'t be your old password')
        }

        if (username) {
            try {
                await User.updateOne({ _id: userId }, { $set: { username: username } })
            } catch (error) {
                if ((error as MongoError).code === 11000) throw new DuplicityError('username already in use')
                throw new SystemError((error as Error).message)
            }
        }

        if (email) {
            try {
                await User.updateOne({ _id: userId }, { $set: { email: email } })
            } catch (error) {
                if ((error as MongoError).code === 11000) throw new DuplicityError('email already in use')
                throw new SystemError((error as Error).message)
            }
        }

        if (oldPassword && newPassword && newPasswordRepeat) {
            try {
                hash = await bcrypt.hash(newPassword, 10)
            } catch (error) {
                throw new SystemError((error as Error).message)
            }

            try {
                await User.updateOne({ _id: userId }, { $set: { password: hash } })
            } catch (error) {
                throw new SystemError((error as Error).message)
            }
        }
    })()
}