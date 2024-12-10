import { View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import getUserName from '../logic/getUserName';
import { useAuth } from './AuthContext'
import { extractPayloadFromJWT } from '../logic/util'



/* async function getUserId() {
    try {
        const token = await AsyncStorage.getItem('token');
        console.log('Token:', token);

        if (token) {
            const userId = extractPayloadFromJWT(token);
            return userId; // Or do something with userId
        } else {
            console.error('No token found');
            return null; // Or handle according to your needs
        }
    } catch (error) {
        console.error('Error retrieving token:', error);
    }
} */

export default function HomeScreen() {
    const { setIsLoggedIn } = useAuth()

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('token'); // Remove the token
            setIsLoggedIn(false); // Navigate to Login screen
        } catch (error) {
            Alert.alert('Error', 'Failed to log out. Please try again.');
        }
    };

    /*  const userId = getUserId() */

    const userName = getUserName()
    console.log('user', userName)
    return <>
        <Text>Home, {/* {userName} */}</Text>
        <Button style={styles.button} onPress={handleLogout} >Logout</Button>
        <Button style={styles.button} onPress={() => navigation.navigate("CreateMeetScreen")} >Create Meet</Button>
    </>

}

const styles = StyleSheet.create({
    button: {
        margin: 10,
        borderRadius: 50,
        backgroundColor: '#76b5c5',
        width: 200
    }

});