import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';

const options = [
  { id: '1', title: 'Edit Profile' },
  { id: '2', title: 'Favorite' },
  { id: '3', title: 'Notifications' },
  { id: '4', title: 'Settings' },
  { id: '5', title: 'Help and Support' },
  { id: '6', title: 'Terms and Conditions' },
  { id: '7', title: 'Log Out' },
];

const Profile = ({ navigation }) => {
  const handleOptionPress = (item) => {
    if (item.id === '7') {
      navigation.navigate('StartScreen');
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
      <Image
        source={require("../../assets/anciana.png")}
        style={styles.profileImage}
      />
      <Text style={styles.name}>Daniel Martinez</Text>
      <Text style={styles.phone}>+123 856479683</Text>

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
  phone: {
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
