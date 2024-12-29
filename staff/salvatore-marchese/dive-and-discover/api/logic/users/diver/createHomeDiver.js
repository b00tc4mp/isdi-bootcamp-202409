import { User } from 'dat/models.js';
import { errors } from 'com';
import bcrypt from 'bcryptjs'

const { ValidationError, SystemError } = errors;

export default async function createHomeDiver({ name, email, password }) {
    // validate input 
    if (!name || !email || !password) {
        throw new ValidationError('All fields are required.')
    }

    // check duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ValidationError('User with this email already exist.')
    }
    const hashedPassword = bcrypt.hashSync(password, 10)

    // create and save user 
    const user = new User({ name, email, password: hashedPassword }); // password hashed in the model

    await user.save()

    return { message: 'Home Diver created successfully!' };
}