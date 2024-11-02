import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Datos de los centros médicos
const medicalCenters = [
  { id: '1', uri: require('../../assets/WhatsApp Image 2024-10-18 at 9.26.33 PM.jpeg'), name: 'Healthy Heart Clinic' },
  { id: '2', uri: require('../../assets/WhatsApp Image 2024-10-18 at 9.27.17 PM.jpeg'), name: 'Joyful Child Hospital' },
  {
    id: '3',
    uri: require('../../assets/WhatsApp Image 2024-10-18 at 9.27.34 PM.jpeg'),
    name: 'Healthy Skin Dermatology Center',
  },
  {
    id: '4',
    uri: require('../../assets/WhatsApp Image 2024-10-18 at 9.28.22 PM.jpeg'),
    name: 'Radiant Smile Dental Clinic',
  },
  {
    id: '5',
    uri: require('../../assets/WhatsApp Image 2024-10-18 at 9.28.35 PM.jpeg'),
    name: 'Healthy Brain Hospital',
  },
];

const MedicalCenters = () => {
  const navigation = useNavigation();

  // Función para manejar la selección de un hospital
  const handleHospitalSelect = (hospitalName) => {
    navigation.navigate('DoctorCenter', { medicalCenter: hospitalName }); // Asegurando que se pasa el nombre del hospital
  };

  const renderCenter = ({ item }) => (
    <View style={styles.centerContainer}>
      <TouchableOpacity onPress={() => handleHospitalSelect(item.name)} style={styles.imageContainer}>
        <Image source={item.uri} style={styles.image} />
      </TouchableOpacity>
      <Text style={styles.name}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medical Center</Text>
      <FlatList
        data={medicalCenters}
        renderItem={renderCenter}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
      />
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
