import 'dotenv/config';
    import db from 'dat';
    import addOpeningHours from './addOpeningHours.js';
    
    await db.connect(process.env.MONGO_URL_TEST);
    
    try {
        // Test case 1: Successfully add opening hours to a user
        console.log('Test 1: Adding opening hours');
        try {
            await addOpeningHours('67a0fe1b85b19dac9dd8af2b', 1, '12:00h', '22:00h');
            console.log('Opening hours added successfully!');
        } catch (error) {
            console.error('Unexpected Error:', error);
        }
    
        // Test case 2: Try adding opening hours for a user that does not exist
        console.log('Test 2: Adding opening hours for a non-existent user');
        try {
            await addOpeningHours('67a0f9bc1494113cc0b5424a', 2, '09:00h', '18:00h');
            console.error('This should not be reached');
        } catch (error) {
            console.error('Expected NotFoundError:', error.message); // Expected to throw NotFoundError
        }
    
    } catch (error) {
        console.error('Unexpected error during tests:', error);
    } finally {
        await db.disconnect();
        console.log('Disconnected from test database.');
    }