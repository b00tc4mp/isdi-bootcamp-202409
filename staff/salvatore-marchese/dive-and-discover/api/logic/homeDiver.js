import { User } from '../../dat/models.js';
import { errors } from 'com';

const { ValidationError } = errors;

export default async function createHomeDiver({ name, email, password }) {
    // validate input 
    if (!name || !email || !password) {
        throw new ValidationError('All fields are required.')
    }

    // check duplicate user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ValidationError('User with this email already exists.')
    }

    // create and save user 
    const user = new User({ name, email, password }); // password  hashed in the model
    await user.save()

    return { message: 'Home Diver created successfully!' }
}