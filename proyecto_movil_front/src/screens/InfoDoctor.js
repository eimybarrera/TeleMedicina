import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const InfoDoctorScreen = () => {
  return (
    <View>
      <Text>Hola, estoy en info del doctor</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cardDoctor: {
    backgroundColor: '#1c2a3a',
    borderRadius: 20,
    flexDirection: 'column',
    width: '90%',
  },
});

export default InfoDoctorScreen;
