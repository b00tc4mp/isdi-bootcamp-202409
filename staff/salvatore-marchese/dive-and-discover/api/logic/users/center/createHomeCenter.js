import { User } from "dat";
import { errors } from "com";
import bcrypt from 'bcryptjs'

const { ValidationError } = errors

export default async function createHomeCenter({ name, email, password, address, postcode, city, country }) {
    if (!name || !email || !password || !address || !city || !country || !postcode ) {
        throw new ValidationError('All fields are required.')
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new ValidationError('User with this email already exist.')
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({ name, email, password: hashedPassword, address, country, city, postcode }) 
    
    await user.save()

    return { message: 'Home Center created successfully!' }
}