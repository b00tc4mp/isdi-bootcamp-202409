import { User, LogBook } from "dat"
import { validate, errors } from "com"
import castLogbookData from "../../utils/parseInfo.js"

const { SystemError, NotFoundError } = errors

export default (userId,logbookId, updateData) => {
    validate.id(userId)
    validate.id(logbookId, 'logbookId')
    validate.updateData(updateData, 'updateData')

    return (async () => {
        let user, logbook

        try {
            // Fetch the user
             user = await User.findById(userId)
        } catch (error) {
            throw new SystemError(error.message)
        }

         if (!user) throw new NotFoundError('user not found')
    
         try {
            // Fetch the logbook
            logbook = await LogBook.findById(logbookId)
         } catch (error) {
            throw new SystemError(error.message)
        }   
        if (!logbook) throw new NotFoundError('logbook not found')
            
            const parsedData = castLogbookData(updateData)    
            
            try {
                // Update the logbook
                await LogBook.findByIdAndUpdate(logbookId, { $set: parsedData }, { new: true })    
            } catch (error) {
                throw new SystemError(error.message)
            }        
    })()
}