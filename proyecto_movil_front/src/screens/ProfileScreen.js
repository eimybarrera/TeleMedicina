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

const Profile = ({ navigation }) => {
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
      <Text style={styles.titulo}> Acá va la foto </Text>
      <Text style={styles.subTitulo}> Aca va el nombre de la persona</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("StartScreen")}
        style={styles.touch}
      >
        <Text style={styles.text}> Cerrar seccion </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 40,
    color: "#34435D",
    fontWeight: "bold",
  },
  subTitulo: {
    fontSize: 20,
    color: "gray",
  },

  touch: {
    padding: 10,
    paddingStart: 30,
    width: "70%",
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#1C2A3A",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "#FFFFFF",
  },
});
export default Profile;
