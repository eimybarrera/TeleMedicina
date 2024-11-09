import React, { useEffect } from 'react';  
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';  
import { useNavigation } from '@react-navigation/native';  
import FontAwesome from '@expo/vector-icons/FontAwesome';  
import { useFavorites } from './FavoritesContext';  

const FavoritesScreen = ({ id_paciente }) => {  
    const { favorites, fetchFavorites, toggleFavorite } = useFavorites();   
    const navigation = useNavigation();  

    useEffect(() => {  
        if (id_paciente) {  
            fetchFavorites(id_paciente);  
        }  
    }, [id_paciente, fetchFavorites]);  

    const renderFavorite = ({ item }) => (  
        <TouchableOpacity onPress={() => toggleFavorite(item)} style={styles.favoriteContainer}>  
            <Text style={styles.name}>{item.name}</Text>  
            <Text style={styles.specialty}>{item.specialty}</Text>  
            <Text style={styles.center}>{item.medicalCenter}</Text>  
            <View style={styles.ratingContainer}>  
                <Text style={styles.rating}>★ {item.rating}</Text>  
                <Text style={styles.reviews}> | {item.reviews} Reviews</Text>  
            </View>  
        </TouchableOpacity>  
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
});  

export default FavoritesScreen;