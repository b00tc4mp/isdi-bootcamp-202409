import bcrypt from 'bcryptjs';
import { User } from 'dat';
import { errors, validate } from 'com';

const { DuplicityError, SystemError } = errors;

export default function registerUser(name, email, password, passwordRepeat) {
    validate.name(name);
    validate.email(email);
    validate.password(password);
    validate.passwordsMatch(password, passwordRepeat);

    // Hash password
    return bcrypt.hash(password, 10)
        .catch(error => { throw new SystemError(error.message) })
        .then(hash => {
            // Create user in the database
            return User.create({ name, email, password: hash });
        })
        .catch(error => {
            // Handle specific errors
            if (error.code === 11000) {
                throw new DuplicityError('User already exists');
            }
            throw new SystemError(error.message);
        });
}