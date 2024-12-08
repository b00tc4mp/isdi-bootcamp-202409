import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import logic from '../../logic';

export default function SearchBarExample() {
    const [search, setSearch] = useState('');
    const [allData, setAllData] = useState([]); // Estado para los datos completos
    const [filteredData, setFilteredData] = useState([]); // Estado para los datos filtrados
    const [selectedPet, setSelectedPet] = useState(null); // Estado para almacenar la mascota seleccionada

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await logic.getPets(); // Obtiene los datos de las mascotas
                setAllData(data); // Almacena los datos completos
                setFilteredData(data); // Inicializa los datos filtrados con todos los elementos
            } catch (error) {
                Alert.alert('Error', error.message); // Muestra un mensaje de error
                console.error(error);
            }
        };

        fetchUserData(); // Llama a la función para cargar los datos al inicio
    }, []);

    const handleSearch = (text) => {
        setSearch(text); // Actualiza el texto ingresado

        if (text) {
            const newData = allData.filter((item) =>
                item.name.toLowerCase().includes(text.toLowerCase()) // Filtra por la propiedad `name`
            );
            setFilteredData(newData); // Actualiza los datos filtrados
        } else {
            setFilteredData(allData); // Resetea a todos los datos si no hay texto
        }
    };

    const handleItemPress = (item) => {
        setSelectedPet(item); // Actualiza el estado con el ítem seleccionado
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Buscar..."
                value={search}
                onChangeText={handleSearch} // Filtra al escribir
            />
            <FlatList
                data={filteredData} // Muestra los datos filtrados
                keyExtractor={(item, index) => index.toString()} // Usa índices como clave
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleItemPress(item)}>
                        <View style={styles.item}>
                            <Text>{item.name}</Text>
                            <Text>{item.owner}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Aquí se renderiza la información del ítem seleccionado */}
            {selectedPet && (
                <View style={styles.selectedPetInfo}>
                    <Text style={styles.infoText}>Información de la mascota seleccionada:</Text>
                    <Text>Nombre: {selectedPet.name}</Text>
                    <Text>Propietario: {selectedPet.owner}</Text>
                    <Text>Edad: {selectedPet.age}</Text> {/* Asegúrate de que esta propiedad exista */}
                    <Text>Raza: {selectedPet.race}</Text> {/* Asegúrate de que esta propiedad exista */}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    searchBar: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        paddingHorizontal: 10, // Añade padding interno para mejorar el diseño
    },
    item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    selectedPetInfo: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
    infoText: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
});
