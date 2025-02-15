import { User } from 'dat/models.js';
import { errors, validate } from 'com';
import bcrypt from 'bcryptjs'

const { ValidationError, SystemError } = errors;

export default function createHomeDiver({ name, email, password }) {
    // validate input 
    validate.name(name, 'name')
    validate.email(email, 'email')
    validate.password(password, 'password')

    // check duplicate user
    return (async () => {
        let hash

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new ValidationError('User with this email already exist.')
        }
        hash = await bcrypt.hash(password, 10)

        // create and save user 
        const user = new User({ name, email, password: hashedPassword }); // password hashed in the model

        await user.save()

        return { message: 'Home Diver created successfully!' };
    })
}