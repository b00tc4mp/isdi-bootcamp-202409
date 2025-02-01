/* import 'dotenv/config';
import db, { User } from 'dat';
import getUserCenter from './getUserCenter';

await db.connect(process.env.MONGO_URL_TEST);

try {
    const user = await User.findById('679cbba23dd31313f6ab5fc8'); 

    if (!user) {
        console.error("User not found");
        return;
    }

    // Valid test: Test retrieving the profile of the created user
    try {
        const requestedUserId = user._id.toString();
        const profile = await getUserCenter(user._id.toString(), requestedUserId);

        console.log('Profile Retrieved:', profile);
    } catch (error) {
        console.error('Unexpected Error (Valid Test):', error);
    }

    // Test: Try to access a profile with a different userId (simulate unauthorized access)
    try {
        const anotherUser = await User.findOne({ email: 'testcenterhurgada@gmail.com' }); 
        if (!anotherUser) {
            console.error("Another user, not found");
            return;
        }

        const requestedUserId = anotherUser._id.toString();
        await getUserCenter(user._id.toString(), requestedUserId);
        console.error('Expected SystemError, but got success!');
    } catch (error) {
        console.log('Expected SystemError (Unauthorized Access):', error.message);
    }

    // Test: Try to access with a non-existing userId
    try {
        const requestedUserId = '605c72ef8cfa4a3d60e3a53'; // Non-existing userId
        await getUserCenter(requestedUserId, requestedUserId);
        console.error('Expected NotFoundError, but got success!');
    } catch (error) {
        console.log('Expected NotFoundError:', error.message);
    }

} catch (error) {
    console.error('Unexpected test runner error:', error);
} finally {
    await db.disconnect();
    console.log('Disconnected from test database.');
} */

    import 'dotenv/config';
    import db, { User } from 'dat';
    import getUserCenter from './getUserCenter';
    
    await db.connect(process.env.MONGO_URL_TEST);
    
    try {
        // Get the user to test with, using the correct userId
        const user = await User.findById('679cbba23dd31313f6ab5fc8');
    
        if (!user) {
            console.error("User not found");
            return; // This stops the test if the user is not found
        }
    
        // Valid test: Test retrieving the profile of the created user
        try {
            const requestedUserId = user._id.toString();
            const profile = await getUserCenter(user._id.toString(), requestedUserId);
            console.log('Profile Retrieved:', profile);
        } catch (error) {
            console.error('Unexpected Error (Valid Test):', error);
        }
    
        // Test: Try to access a profile with a different userId (simulate unauthorized access)
        try {
            const anotherUser = await User.findOne({ email: 'testcenterhurgada@gmail.com' });
    
            if (!anotherUser) {
                console.error("Another user not found");
                return; // Return if another user is not found
            }
    
            const requestedUserId = anotherUser._id.toString();
            await getUserCenter(user._id.toString(), requestedUserId); // Try to access another user's profile
            console.error('Expected SystemError, but got success!');
        } catch (error) {
            console.log('Expected SystemError (Unauthorized Access):', error.message);
        }
    
        // Test: Try to access with a non-existing userId
        try {
            const requestedUserId = '605c72ef8cfa4a3d60e3a53'; // Non-existing userId
            await getUserCenter(requestedUserId, requestedUserId);
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