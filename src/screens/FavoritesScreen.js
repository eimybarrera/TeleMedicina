import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FavoritesScreen = () => {
const [favorites, setFavorites] = useState([
    { id: '1', name: 'Dr. María López', specialty: 'Pediatría' },
    { id: '2', name: 'Clínica La Esperanza', specialty: 'Urgencias' },
    // Cambiarlo por la bd
]);

const renderFavorite = ({ item }) => (
    <View style={styles.favoriteContainer}>
    <Text style={styles.text}>Nombre: {item.name}</Text>
    <Text style={styles.text}>Especialidad: {item.specialty}</Text>
    </View>
);

return (
    <View style={styles.container}>
    <Text style={styles.title}>Mis Favoritos</Text>
    <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.id}
    />
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
},
favoriteContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
},
text: {
    fontSize: 16,
},
});

export default FavoritesScreen;
