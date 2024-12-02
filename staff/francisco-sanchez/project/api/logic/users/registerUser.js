import bcrypt from 'bcryptjs'

import { User } from 'dat'

import { validate, errors } from 'com'

const { DuplicityError, SystemError } = errors

export default (name,
    email,
    username,
    password,
    passwordRepeat,
    plan,
    planExpiryDate,
    role,
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
    validate.email(email)
    validate.username(username)
    validate.password(password)
    validate.passwordsMatch(password, passwordRepeat)


    //TODO: FIX THIS "CHAPUZA"
    if (plan === undefined)
        plan = 'free'

    if (creationStatus === undefined)
        creationStatus = 'true'


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
                adquiredPacks
            })
        } catch (error) {
            if (error.code === 11000) throw new DuplicityError('user elready exists')

            throw new SystemError(error.message)

        }
    })()
}