import 'dotenv/config'
import db from 'dat'
import getLogs from './getLogs.js'

db.connect(process.env.MONGO_URL_TEST)
  .then(async () => {
    try {
      const userId = '67503f6a10182798c1418773'; 
      const logs = await getLogs(userId);
      console.log('Logs retrieved successfully:', logs);
    } catch (error) {
      console.error('Error retrieving logs:', error);
    }
  })
  .catch(console.error)
  .finally(() => db.disconnect());