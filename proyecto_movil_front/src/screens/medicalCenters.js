import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MedicalCenters = () => {
  const navigation = useNavigation();
  const [medicalCenters, setMedicalCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:3000/centros') // URL de tu API
      .then((response) => {
        console.log('Centros médicos:', response.data); // Verifica la estructura de los datos
        setMedicalCenters(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener centros médicos:', error);
        setLoading(false);
      });
  }, []);

  const handleHospitalSelect = (hospitalName) => {
    console.log('Centro médico seleccionado:', hospitalName);
    navigation.navigate('DoctorCenter', { medicalCenterId: hospitalName });
  };

  const renderCenter = ({ item }) => {
    if (!item.id || !item.nombre || !item.foto) {
      return null; // Evita mostrar elementos incompletos
    }

    return (
      <View style={styles.centerContainer}>
        <TouchableOpacity onPress={() => handleHospitalSelect(item.nombre)} style={styles.imageContainer}>
          <Image source={{ uri: item.foto }} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.name}>{item.nombre}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Centers</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={medicalCenters}
          renderItem={renderCenter}
          keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())} // Ajusta esto según el campo correcto
          numColumns={2}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  listContainer: {
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  name: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
});

export default MedicalCenters;
