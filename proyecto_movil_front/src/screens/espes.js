import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from './FavoritesContext';

const Espes = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const { favorites, toggleFavorite } = useFavorites();
  const [loading, setLoading] = useState(true);

  // Obtén los datos de los doctores desde la API
  useEffect(() => {
    axios
      .get('http://localhost:3000/medicos') // Cambia la URL si es necesario
      .then((response) => {
        setDoctors(response.data);
        // Filtra los doctores por categoría después de obtener los datos
        const filteredData = response.data.filter(
          (doctor) => doctor.specialty.toLowerCase() === category.toLowerCase()
        );
        setFilteredDoctors(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      });
  }, [category]);

  const navigateToDoctorDetail = (doctorId) => {
    navigation.navigate('DoctorDetails', { doctorId });
  };

  const renderDoctorCard = (item) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id);

    return (
      <TouchableOpacity style={styles.card} key={item.id} onPress={() => navigateToDoctorDetail(item.id)}>
        <View style={styles.cardContainer}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
            <Text style={styles.center}>{item.medicalCenter}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {item.rating}</Text>
              <Text style={styles.reviews}> | {item.reviews} Reviews</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.heartIconContainer} onPress={() => toggleFavorite(item)}>
            <FontAwesome name={isFavorite ? 'heart' : 'heart-o'} size={20} color={isFavorite ? 'red' : '#000'} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctores en {category}</Text>
      {loading ? (
        <Text>Cargando doctores...</Text>
      ) : (
        <FlatList
          data={filteredDoctors}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => renderDoctorCard(item)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2A9D8F',
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  center: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: '#FFD700',
  },
  reviews: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  heartIconContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default Espes;
