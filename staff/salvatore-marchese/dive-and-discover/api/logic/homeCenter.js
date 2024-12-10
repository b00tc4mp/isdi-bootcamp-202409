import { errors } from "com";

const { ValidationError } = errors

export default async function createHomeCenter({ name, email, password, address, postcode, city, country, telephone, timetable }) {
    if (!name || !email || !password || !address || !postcode || !city || !country || !telephone || !timetable ) {
        throw new ValidationError('All fields are required.')
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        throw new ValidationError('User with this email already exist.')
    }

    const user = new user({ name, email, password }) 

    
    await user.save()

    return { message: 'Home Center created successfully!' }
}