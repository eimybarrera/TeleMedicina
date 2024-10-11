import FontAwesome from '@expo/vector-icons/FontAwesome'; // Para agregar ícono de búsqueda
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // Agregar ScrollView
import doctorsData from './database/database';

// Definir las categorías disponibles
const categories = [
  'All',
  'General',
  'Cardiologia',
  'Dentista',
  'Dermatología',
  'Neurología',
  'Pediatría',
  'Odontología',
  'Ginecología',
  'Oftalmología',
  'Psiquiatría',
];

const CategoryBar = ({ selectedCategory, onCategoryPress }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onCategoryPress(category)}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.selectedCategoryButton, // Cambia el estilo si está seleccionado
          ]}
        >
          <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const AllDoctorScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredDoctors(doctorsData); // Mostrar todos los doctores si la categoría es 'All'
    } else {
      const filteredData = doctorsData.filter(
        (doctor) => doctor.specialty.toLowerCase() === category.toLowerCase() // Filtrar por categoría
      );
      setFilteredDoctors(filteredData);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filteredData = doctorsData.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(text.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredDoctors(filteredData);
    } else {
      setFilteredDoctors(doctorsData);
    }
  };

  //tarjeta de doctor
  const renderDoctorCard = (item) => (
    <TouchableOpacity style={styles.card} key={item.id} onPress={() => navigation.navigate('Doctor Details')}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.specialty}>{item.specialty}</Text>
        <Text style={styles.center}>{item.medicalCenter}</Text>
        <Text style={styles.rating}>
          Rating: {item.rating} ({item.reviews} reviews)
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <FontAwesome name='search' size={20} color='gray' style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder='Buscar doctor...'
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
      <View>
        <CategoryBar selectedCategory={selectedCategory} onCategoryPress={handleCategoryPress} />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {filteredDoctors.map((doctor) => renderDoctorCard(doctor))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '90%',
    alignSelf: 'center',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
  },
  scrollContainer: {
    marginTop: 10,
    paddingVertical: 0,
  },
  categoryBar: {
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginRight: 10,
  },

  selectedCategory: {
    backgroundColor: '#3f51b5', // Color para la categoría seleccionada
  },
});

export default AllDoctorScreen;
