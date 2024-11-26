import { User } from 'dat';
import { validate, errors } from 'com';
const { SystemError, CredentialsError } = errors;

const authenticateUser = (username, password) => {
    validate.username(username);
    validate.password(password);

    return User.findOne({ username, password })
        .catch(error => {throw new SystemError(error.message)})
        .then(user => {
            if (!user) throw new CredentialsError('wrong credentials');

            return {
                id: user._id.toString(),
                role: user.role
            };
        })
}
export default authenticateUser;