import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFavorites } from './FavoritesContext';

const FavoritesScreen = () => {
    const { favorites } = useFavorites();
    const navigation = useNavigation();

    const renderFavorite = ({ item }) => (
    <View style={styles.favoriteContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
        <Text style={styles.center}>{item.medicalCenter}</Text>
        <View style={styles.ratingContainer}>
            <Text style={styles.rating}>★ {item.rating}</Text>
            <Text style={styles.reviews}> | {item.reviews} Reviews</Text>
        </View>
    </View>
);

return (
    <View style={styles.container}>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <FontAwesome name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
    </View>
    <View style={styles.divider} />
    <FlatList
        data={favorites}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.id.toString()}
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
backButton: {
    marginBottom: 20,
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
},
title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10, 
},
divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
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