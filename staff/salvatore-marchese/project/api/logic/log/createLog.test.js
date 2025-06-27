import 'dotenv/config'
import db, { User } from 'dat'
import createLog from './createLog.js'
import { errors } from 'com'

const { NotFoundError, SystemError } = errors

await db.connect(process.env.MONGO_URL_TEST)

const data = {
    diver: ['67b744f0f3207feac76f80ab'],
    diveSite: 'Tossa De Mar',
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
    notes: 'Muchos cegarro amego'
}

try {
    // Valid test: Test creating a log book for an existing user
    const user = await User.findById('67b744f0f3207feac76f80ab');
    if (!user) throw new NotFoundError('User not found');

    const newLog = await createLog('67b744f0f3207feac76f80ab', '67b744f0f3207feac76f80ab', data);
    console.log('Log created successfully:', newLog);

} catch (error) {
    if (error instanceof NotFoundError) {
        console.error('User not found error:', error.message);
    } else {
        console.error('Unexpected error:', error.message);
        throw new SystemError(error.message);
    }
}

try {
    // Test: Try to create a log book for a non-existent user
    const nonExistentUserId = '605c72ef8cfa4a3d60e3a53'; // Example of non-existent user
    const logData = {
        diveSite: "Madrid Bay",
        date: "16/10/2023",
        depth: 20,
        time: 30,
        weather: "Cloudy",
        temperature: 18,
        visibility: "Average",
        waves: "Moderate",
        wetSuit: 7,
        weight: 80,
        tankSize: 15,
        tankBar: 150,
        feeling: "Nervous",
        diveCenter: "Madrid Divers",
        notes: "Challenging dive"
    };

    const newLog = await createLog(nonExistentUserId, nonExistentUserId, logData);  // This should throw
    console.log('Log created successfully:', newLog); // This should not be reached

} catch (error) {
    if (error instanceof NotFoundError) {
        console.log('Expected NotFoundError:', error.message);
    } else {
        console.error('Unexpected error:', error.message);
    }
} finally {
    await db.disconnect();
    console.log('Disconnected from test database.');
}