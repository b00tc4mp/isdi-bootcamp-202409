import React, { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'
import { StyleSheet, Text } from 'react-native'



const Maps = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            // Request permission
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            // Get current location
            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc);
        })();
    }, []);

    if (!location) {
        return <Text>Loading location...</Text>;
    }

    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    const defaultRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }

    return (
        <>
            <MapView style={styles.map} initialRegion={defaultRegion}>
                <Marker coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
                    title='You are here' />
            </MapView>
        </>

    )
}



const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        marginTop: 20,
        marginBottom: 20
    },

})

export default Maps
