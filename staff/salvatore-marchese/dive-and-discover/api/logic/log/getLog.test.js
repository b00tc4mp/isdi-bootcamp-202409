import 'dotenv/config'
import db, { User, LogBook as Log } from 'dat'
import getLog from './getLog.js'

await db.connect(process.env.MONGO_URL_TEST)

try {
    // Create a user for testing
    const user = await User.create({
        name: "Test-User",
        email: "testuser@test.com",
        password: "123123123",
        role: "diver"
    });

    // Create a log for this user
    const log = await Log.create({
        diver: user._id,
        diveSite: "Test Dive Site",
        date: "2023-12-01",
        depth: 20,
        time: 30,
        weather: "Sunny",
        temperature: 25,
        visibility: "Good",
        waves: "Calm",
        wetSuit: 5,
        weight: 70,
        tankSize: 12,
        tankBar: 200,
        feeling: "Excited",
        diveCenter: "Test Dive Center",
        notes: "Great dive"
    });

    // Test case: Valid user and logId
    try {
        const result = await getLog(user._id.toString(), log._id.toString());
        console.log("Log found:", result)
    } catch (error) {
        console.error('Unexpected Error (Valid Test):', error);
    }

    // Test case: Try fetching log for a non-existent user
    try {
        await getLog("67a127a2f0f8a331c710e122", log._id.toString());
        console.error('Expected NotFoundError, but got success!');
    } catch (error) {
        console.log('Expected NotFoundError (User not found):', error.message);
    }

    // Test case: Try fetching a log with an invalid logId
    try {
        await getLog(user._id.toString(), "67a127a2f0f8a331c710e122");
        console.error('Expected NotFoundError');
    } catch (error) {
        console.log('Expected NotFoundError (Log not found):', error.message);
    }

    // Test case: Try fetching log for a user without logs
    try {
        const newUser = await User.create({
            name: "NewUser",
            email: "newuser@test.com",
            password: "123123123",
            role: "diver"
        });

        await getLog(newUser._id.toString(), log._id.toString());
        console.error('Expected NotFoundError (Log not found for user)');
    } catch (error) {
        console.log('Expected NotFoundError (Log not found for user):', error.message);
    }

} catch (error) {
    console.error('Unexpected test runner error:', error);
} finally {
    await db.disconnect();
    console.log('Disconnected from test database.');
}