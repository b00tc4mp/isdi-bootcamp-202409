import cron from 'node-cron'
import logic from '../logic/index.js'

function deleteAnonymousUsersCronJob(): void {
    cron.schedule('0 0 * * *', async () => {
        await logic.deleteAllAnonymousUsers()
    })
}

export default deleteAnonymousUsersCronJob