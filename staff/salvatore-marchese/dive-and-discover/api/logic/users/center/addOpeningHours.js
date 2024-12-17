import { User, OpeningHours } from 'dat/index.js'
import { validate, errors } from 'com/index.js'

const { SystemError, NotFoundError } = errors

//TEST ADDOPENINGHOURS.TEST.JS FAILS at line 24, validate.text(...) is not a function 
//(userId, data)
/*
data = [
    {
        day: 1,
        openTime: "12:00h",
        closeTime: "22:00h"
    },
]*/


export default async (userId, day, openTime, closeTime) => {
    validate.id(userId, 'userId')
     // Validate the day is a number and it is between 1 and 7
     if (typeof day !== 'number' || day < 1 || day > 7) {
        throw new Error("Invalid day: must be a number between 1 and 7");
    }
    validate.text(openTime)
    validate.text(closeTime)
    
    console.log(day, openTime, closeTime)

    return User.findById(userId).lean()
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            const openingHours = new OpeningHours({ day, openTime, closeTime })

            return User.findByIdAndUpdate(userId, { $push: {openingHours } }, { new: true } )
        })
        .catch(error => { throw new SystemError(error.message) })
        .then(() => { })
}

    /* let result
    try {
        result = await Promise.all([
            User.findById(userId).lean(),
        ])
    } catch (error) {
        throw new SystemError(error.message)
        const result = undefined
    }
    const [user] = result
    if (!user) throw new NotFoundError('user not found')
    const openingHours = new OpeningHours({
        day,
        openTime,
        closeTime
    })
    //If taking the opening hour one by one - do this
    const userOpeningHours = user.openingHours || []
    userOpeningHours.push(openingHours)
    let _
    try {
        _ = await User.findOneAndUpdate({ _id: user._id }, { openingHours: userOpeningHours })
    } catch (error_1) {
        throw new SystemError(error_1.message)
        const _ = undefined
    }
 */