import 'dotenv/config'
import db from 'dat'
import updateLog from './updateLog.js'


const data = {
    diver: ['67503f6a10182798c1418773'],
    date: '01-17-2024',
    depth: '10',
    time: '30',
    weather: 'Sunny',
    temperature: '24',
    visibility: 'Good',
    waves: 'Low',
    wetSuit: '5',
    weight: '6',
    tankSize: '12',
    tankBar: '200',
    feeling: 'Amazing',
    diveCenter: 'Tossa Divers',
    diveSite: 'Barceloneta',
    notes: 'Muchos cegarro amego'
}

try {
    await db.connect(process.env.MONGO_URL_TEST)
    await updateLog('676310ec365df2fb2590cf5e', '6765d2b1da01678bbab8b023',data)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}