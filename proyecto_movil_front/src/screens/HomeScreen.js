import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const InicioAppMedica = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    {
      id: '1',
      uri: require('../../assets/WhatsApp Image 2024-10-18 at 9.26.33 PM.jpeg'),
      name: 'Healthy Heart Clinic',
    },
    {
      id: '2',
      uri: require('../../assets/WhatsApp Image 2024-10-18 at 9.27.17 PM.jpeg'),
      name: 'Joyful Child Hospital',
    },
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

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    navigation.navigate('espes', { category });
  };

  const Banner = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 7000);

      return () => clearInterval(interval);
    }, []);

    return (
      <View style={styles.banner}>
        <FlatList
          data={[images[currentImageIndex]]}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => {
                // Navegar usando el nombre del centro médico
                if (item.name) {
                  navigation.navigate('DoctorCenter', { medicalCenter: item.name });
                } else {
                  console.warn('No center name found for navigation.');
                }
              }}
            >
              <Image
                source={item.uri}
                style={styles.bannerImage}
                onError={() => console.error('Error loading image')}
              />
              <View style={styles.overlay}>
                <Text style={styles.overlayText}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location</Text>
        <View style={styles.locationContainer}>
          <FontAwesome5 name='map-marker-alt' size={20} color='black' style={styles.locationIcon} />
          <Text style={styles.location}>Medellín, COL</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder='Search doctor...'
            placeholderTextColor='rgba(0, 0, 0, 0.6)'
          />
          <FontAwesome name='search' size={20} color='black' style={styles.searchIcon} />
        </View>
      </View>
      <Banner />
      <View style={styles.categories}>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress('General')}>
          <FontAwesome name='heartbeat' size={40} color='#2A9D8F' />
          <Text style={styles.categoryText}>General</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress('Cardiology')}>
          <FontAwesome name='heart' size={40} color='#E76F51' />
          <Text style={styles.categoryText}>Cardiology</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress('Dentistry')}>
          <FontAwesome5 name='tooth' size={40} color='#2A9D8F' />
          <Text style={styles.categoryText}>Dentist</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress('Dermatology')}>
          <FontAwesome name='sun-o' size={40} color='#E9C46A' />
          <Text style={styles.categoryText}>Dermatology</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress('Neurology')}>
          <FontAwesome name='brain' size={40} color='#F4A261' />
          <Text style={styles.categoryText}>Neurology</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress('Pediatrics')}>
          <FontAwesome name='child' size={40} color='#6C5B7B' />
          <Text style={styles.categoryText}>Pediatrics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress('Gynecology')}>
          <FontAwesome name='female' size={40} color='#F7B32B' />
          <Text style={styles.categoryText}>Gynecology</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress('Ophthalmology')}>
          <FontAwesome name='eye' size={40} color='#2A9D8F' />
          <Text style={styles.categoryText}>Ophthalmology</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategoryPress('Psychiatry')}>
          <FontAwesome name='medkit' size={40} color='#F4A261' />
          <Text style={styles.categoryText}>Psychiatry</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('AllDoctor')} style={styles.viewAllContainer}>
          <Text style={styles.viewAllText}>See all</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 80,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 10,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 17,
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 'normal',
    marginHorizontal: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  location: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  },
  searchBar: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 8,
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageContainer: {
    width: 300,
    height: 200,
    marginHorizontal: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  overlayText: {
    color: 'white',
    fontSize: 16,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  categoryItem: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
  },
  categoryText: {
    fontSize: 12,
    marginTop: 5,
  },
  viewAllContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  viewAllText: {
    color: '#2A9D8F',
    fontWeight: 'bold',
  },
});

export default InicioAppMedica;
