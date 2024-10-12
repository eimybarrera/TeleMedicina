import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import doctorsData from './database/database';

const categories = [
  'All',
  'General',
  'Cardiology',
  'Dentistry',
  'Dermatology',
  'Neurology',
  'Pediatrics',
  'Gynecology',
  'Ophthalmology',
  'Psychiatry',
];

const CategoryBar = ({ selectedCategory, onCategoryPress }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryBar}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => onCategoryPress(category)}
          style={[styles.categoryButton, selectedCategory === category && styles.selectedCategoryButton]}
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
    backgroundColor: '#3f51b5',
  },
});

export default AllDoctorScreen;
