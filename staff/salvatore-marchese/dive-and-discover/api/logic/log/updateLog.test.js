import 'dotenv/config'
import db, { User } from 'dat'
import updateLog from './updateLog.js'


const data = {
    diver: ['67503f6a10182798c1418773'],
    date: '01-09-2024',
    depth: '18mt',
    time: '45min',
    weather: 'Sunny',
    temperature: 24,
    visibility: 'Good',
    waves: 'Low',
    wetSuit: '5mm',
    weight: '6kg',
    tankSize: '12L',
    tankBar: 200,
    feeling: 'Amazing',
    diveCenter: 'Tossa Divers',
    diveSite: 'Tossa de Mar',
    notes: 'First dive in Costa Brava, perfect'
}

try {
    await db.connect(process.env.MONGO_URL_TEST)
    const result = await updateLog('67503f6a10182798c1418773', data)
    console.log(result)
} catch (error) {
    console.error(error)
} finally {
    await db.disconnect()
}