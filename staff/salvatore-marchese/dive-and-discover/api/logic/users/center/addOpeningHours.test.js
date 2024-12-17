import 'dotenv/config';
import db from 'dat';
import addOpeningHours from './addOpeningHours.js';
import { User, OpeningHours } from 'dat';  // Import User and OpeningHours models

// Connect to the test database
db.connect(process.env.MONGO_URL_TEST)
    .then(async () => {
        try {
            // Test case 1: Successfully add opening hours to a user
            console.log('Test 1: Adding opening hours');
            await addOpeningHours('675c4091da1266cc13fb9496', 1, '12:00h', '22:00h');
            console.log('Opening hours added successfully!');
            
            // Test case 2: Try adding opening hours for a user that does not exist
            console.log('Test 2: Adding opening hours for a non-existent user');
            await addOpeningHours('non-existent-user-id', 2, '09:00h', '18:00h')
                .then(() => console.log('This should not be reached'))
                .catch(error => console.error('Expected error: ', error)); // Expected to throw NotFoundError

            // Test case 3: Try adding opening hours with an invalid day
            console.log('Test 3: Invalid day');
            await addOpeningHours('675c4091da1266cc13fb9496', 8, '09:00h', '18:00h')
                .then(() => console.log('This should not be reached'))
                .catch(error => console.error('Expected error: ', error)); // Expected to throw Invalid day error

            // Test case 4: Try adding opening hours with invalid time format
            console.log('Test 4: Invalid time format');
            await addOpeningHours('675c4091da1266cc13fb9496', 3, '', '18:00h')
                .then(() => console.log('This should not be reached'))
                .catch(error => console.error('Expected error: ', error)); // Expected to throw an error for empty openTime
        } catch (error) {
            console.error(error);
        }
    })
    .catch(console.error)
    .finally(() => {
        // Disconnect from the test database
        db.disconnect();
    });