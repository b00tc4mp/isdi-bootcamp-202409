import 'dotenv/config'
import db, { User } from 'dat'
import getProfile from './getProfile'
import { SystemError, NotFoundError } from 'com'

await db.connect(process.env.MONGO_URL_TEST)

try {
    // Retrieve the existing user from the database
    const user = await User.findById('679cbba23dd31313f6ab5fc8'); // Use the MongoDB _id

    if (!user) {
        console.error('User not found');
        return;
    }

    // Valid test: Test retrieving the profile of the created user
    try {
        const requestedUserId = user._id.toString();
        const profile = await getProfile(user._id.toString(), requestedUserId);

        console.log('Profile Retrieved:', profile);
    } catch (error) {
        console.error('Unexpected Error (Valid Test):', error);
    }

    // Test: Try to access a profile with a different userId (simulate unauthorized access)
    try {
        const anotherUser = await User.create({
            name: 'AnotherCenter',
            email: 'anothercenter@test.com',
            password: '123123123',
            role: 'center',
            address: 'Test Street',
            country: 'Spain',
            city: 'Madrid',
            postcode: '28001',
            telephone: '987654321',
            openingHours: [],
            businessHours: [],
        });

        const requestedUserId = anotherUser._id.toString();
        await getProfile(user._id.toString(), requestedUserId);
        console.error('Expected SystemError, but got success!');
    } catch (error) {
        console.log('Expected SystemError (Unauthorized Access):', error.message);
    }

    // Test: Try to access with a non-existing userId
    try {
        const requestedUserId = '605c72ef8cfa4a3d60e3a53'; // Non-existing userId
        await getProfile(requestedUserId, requestedUserId);
        console.error('Expected NotFoundError, but got success!');
    } catch (error) {
        console.log('Expected NotFoundError:', error.message);
    }

} catch (error) {
    console.error('Unexpected test runner error:', error);
} finally {
    await db.disconnect();
    console.log('Disconnected from test database.');
}