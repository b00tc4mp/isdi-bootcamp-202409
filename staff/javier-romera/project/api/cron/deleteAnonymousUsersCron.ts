import cron from 'node-cron'
import logic from '../logic/index.js'

function deleteAnonymousUsersCronJob(): void {
    cron.schedule('0 * * * *', async () => {
        await logic.deleteAllAnonymousUsers()
        console.log('croneado jeje god')
    })
}

export default deleteAnonymousUsersCronJob