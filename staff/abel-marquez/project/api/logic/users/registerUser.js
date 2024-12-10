import bcrypt from 'bcryptjs';

import { User } from 'dat';
import { validate, errors } from 'com';

const { DuplicityError, SystemError } = errors;

export default async function registerUser(name, email, username, password, passwordRepeat) {
    validate.name(name);
    validate.email(email);
    validate.username(username);
    validate.password(password);
    validate.passwordsMatch(password, passwordRepeat);

    try {
        const hash = await bcrypt.hash(password, 10);

        await User.create({ name, email, username, password: hash });
    } catch (error) {
        if (error.code === 11000) {
            throw new DuplicityError('user already exists');
        }
        throw new SystemError(error.message);
    }
}
