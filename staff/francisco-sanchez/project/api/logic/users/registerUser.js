import bcrypt from 'bcryptjs'

import { User } from 'dat'
import errors from 'com/errors.js'
import validate from 'com/validate.js'

const { DuplicityError, SystemError } = errors

export default (name,
    username,
    password,
    passwordRepeat,
    email,
    plan,
    planExpiryDate,
    roles,
    dni,
    surname1,
    surname2,
    biography,
    country,
    province,
    city,
    postalCode,
    street,
    street2,
    number,
    flat,
    legalName,
    website,
    creationStatus,
    customers = [],
    ownPacks = [],
    adquiredPacks = []) => {
    validate.name(name)
    validate.username(username)
    validate.email(email)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)


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
                username,
                password: hash,
                email,
                plan,
                planExpiryDate: planExpiryDate || null,
                roles,
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
                adquiredPacks
            })
        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('user elready exists')

            throw new SystemError(error.message)

        }
    })()
}