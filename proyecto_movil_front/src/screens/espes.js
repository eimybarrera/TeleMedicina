import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import doctorsData from './database/database';

const Espes = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  // Filtra los doctores en función de la categoría recibida
  useEffect(() => {
    const filteredData = doctorsData.filter((doctor) => doctor.specialty.toLowerCase() === category.toLowerCase());
    setFilteredDoctors(filteredData);
  }, [category]);

  // Función para navegar a la pantalla de detalles del doctor
  const navigateToDoctorDetail = (doctorId) => {
    console.log('Doctor ID:', doctorId);
    navigation.navigate('Doctor Details', { doctorId: doctorId });
  };

  const renderDoctorCard = (item) => (
    <TouchableOpacity
      style={styles.card}
      key={item.id}
      onPress={() => navigateToDoctorDetail(item.id)} // Navegar al detalle del doctor
    >
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
        <View style={styles.heartIconContainer}>
          <FontAwesome name='heart-o' size={20} color='#000' />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctores en {category}</Text>
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => renderDoctorCard(item)}
      />
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
