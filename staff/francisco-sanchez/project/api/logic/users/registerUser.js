import bcrypt from 'bcryptjs'

import { User } from 'dat'

import { validate, errors } from 'com'

import { emailRegisterWelcome } from '../emailing/index.js'

const { DuplicityError, SystemError } = errors

const assignRandomProfileImage = () => {
    const imageNumber = Math.floor(Math.random() * 12) + 1; //from 1 to 12
    return `/images/profile/profile${imageNumber}.jpeg`;
};

export default (name, email, username, password, passwordRepeat) => {
    validate.name(name)
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)

    //In the register moment all users will be free
    const plan = 'free'
    const creationStatus = 'true'
    const role = 'standard'

    const planExpiryDate = '', dni = '', surname1 = '',
        surname2 = '', biography = '', country = '', province = '', city = '',
        postalCode = '', street = '', street2 = '', number = '', flat = '',
        legalName = '', website = ''

    const customers = [], ownPacks = [], adquiredPacks = []


    return (async () => {
        let hash

        try {
            hash = await bcrypt.hash(password, 10)
        } catch (error) {
            throw new SystemError(error.message)
        }

        try {
            await User.create({
                name,
                email,
                username,
                password: hash,
                plan,
                planExpiryDate: planExpiryDate || null,
                role,
                dni: dni || null,
                surname1: surname1 || null,
                surname2: surname2 || null,
                biography: biography || null,
                country: country || null,
                province: province || null,
                city: city || null,
                postalCode: postalCode || null,
                street: street || null,
                street2: street2 || null,
                number: number || null,
                flat: flat || null,
                legalName: legalName || null,
                website: website || null,
                creationStatus,
                customers,
                ownPacks,
                adquiredPacks,
                profileImage: assignRandomProfileImage(), //Create random profile image
            })

        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('User already exists')
            throw new SystemError(error.message)
        }

        try {
            //send confirmation email
            emailRegisterWelcome(email, name)
        } catch (error) {
            throw new SystemError(error.message)
        }
    })()
}