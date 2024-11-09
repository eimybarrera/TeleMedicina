import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from './FavoritesContext';

const DoctorCenter = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { medicalCenterId } = route.params; // Recibimos el nombre del centro
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites(); // Para manejar los favoritos

  // Obtiene los médicos de la API según el nombre del centro médico seleccionado
  useEffect(() => {
    // Cambié la URL para utilizar el nombre del centro en lugar del ID
    axios
      .get(`http://localhost:3000/medicos/${medicalCenterId}`) // Usamos el nombre del centro
      .then((response) => {
        console.log('Médicos:', response.data); // Verifica que los datos sean correctos
        setFilteredDoctors(response.data); // Actualiza el estado con los médicos
        setLoading(false); // Desactiva el estado de carga
      })
      .catch((error) => {
        console.error('Error al obtener los médicos:', error);
        setLoading(false); // También desactiva el estado de carga en caso de error
      });
  }, [medicalCenterId]); // El efecto se ejecuta cuando cambia el nombre del centro

  // Función para navegar a los detalles del doctor
  const navigateToDoctorDetail = (doctorId) => {
    console.log('Doctor ID:', doctorId);
    navigation.navigate('DoctorDetails', { doctorId: doctorId });
  };

  // Renderiza la tarjeta de cada médico
  const renderDoctorCard = (item) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id); // Verifica si está en favoritos

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigateToDoctorDetail(item.id)} // Navega al detalle del doctor
      >
        <View style={styles.cardContainer}>
          {/* Imagen del médico */}
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.cardContent}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.specialty}>{item.specialty}</Text>
            <Text style={styles.center}>{item.medicalCenter}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.rating}>★ {item.rating}</Text>
              <Text style={styles.reviews}> | {item.review} Reviews</Text>{' '}
              {/* Reemplaza 'review' con la propiedad correcta si es necesario */}
            </View>
          </View>

          {/* Ícono de favorito */}
          <TouchableOpacity
            style={styles.heartIconContainer}
            onPress={() => toggleFavorite(item)} // Marca o desmarca como favorito
          >
            <FontAwesome
              name={isFavorite ? 'heart' : 'heart-o'} // Cambia el ícono según si está en favoritos
              size={20}
              color={isFavorite ? 'red' : '#000'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  // Si los datos aún se están cargando
  if (loading) {
    return <Text>Cargando médicos...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Doctores en {medicalCenterId}</Text>
      {/* FlatList para mostrar los médicos */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => item.id.toString()} // Asegúrate de que 'id' es único
        renderItem={({ item }) => renderDoctorCard(item)} // Renderiza cada tarjeta de médico
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

export default DoctorCenter;
