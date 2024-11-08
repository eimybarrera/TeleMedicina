// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const options = [
  { id: '1', title: 'Edit Profile' },
  { id: '2', title: 'Favorite' },
  { id: '4', title: 'Settings' },
  { id: '5', title: 'Help and Support' },
  { id: '6', title: 'Terms and Conditions' },
  { id: '7', title: 'Log Out' },
];

const Profile = ({ navigation, route }) => {
  const { userName, userEmail, userProfilePic } = route.params || {};

  // URL de la imagen predeterminada
  const defaultProfilePic = 'https://img.freepik.com/foto-gratis/encantadora-pareja-tiene-calido-abrazo_273609-44073.jpg?semt=ais_hybrid';

  const handleOptionPress = (item) => {
    if (item.id === '7') {
      navigation.navigate('StartScreen');
    } else if (item.id === '2') {
      navigation.navigate('Favorites');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={() => handleOptionPress(item)}>
      <Text style={styles.optionText}>{item.title}</Text>
      <Text style={styles.arrow}>➔</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      {/* Mostrar foto de perfil o imagen predeterminada si no existe */}
      <Image
        source={{ uri: userProfilePic || defaultProfilePic }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{userName || 'Usuario'}</Text>
      <Text style={styles.email}>{userEmail || 'Correo no disponible'}</Text>

      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.menu}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 20,
  },
  menu: {
    width: '100%',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  optionText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
    color: '#ccc',
  },
});

export default Profile;
