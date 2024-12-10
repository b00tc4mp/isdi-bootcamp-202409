import 'dotenv/config';
import db from 'dat';
import registerUser from './registerUser.js';
import { User } from 'dat';

(async () => {
    try {
        console.log('Connecting to test database...');
        await db.connect(process.env.MONGO_URL_TEST);

        console.log('Cleaning up test database...');
        await User.deleteMany();

        console.log('Running test for registerUser...');
        try {
            await registerUser('Abel', 'abel@example.com', 'abelmarquez', 'password123', 'password123');
            console.log('User registered successfully.');

            const user = await User.findOne({ username: 'abelmarquez' });

            if (user) {
                console.log('User found in database:');
                console.log(`Name: ${user.name}`);
                console.log(`Email: ${user.email}`);
                console.log(`Username: ${user.username}`);
            } else {
                console.error('User was not found in database after registration.');
            }
        } catch (error) {
            console.error('Error during registerUser test:', error.message);
        }
    } catch (error) {
        console.error('Database connection error:', error.message);
    } finally {
        console.log('Disconnecting from test database...');
        await db.disconnect();
    }
})();
