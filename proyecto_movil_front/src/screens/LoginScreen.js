import React from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/logoNegro.png')} style={styles.image} resizeMode='cover' />
      </View>
      <Text style={{ fontSize: 20, marginBottom: 15 }}>HealthPal</Text>
      <Text style={styles.titulo}> Hi, Welcome Back!</Text>
      <Text style={styles.subTitulo}> Hope you're doing fine</Text>

      <View style={styles.inputContainer}>
        <Icon name='mail-outline' size={20} color='#6B7280' style={styles.icon} />
        <TextInput placeholder='Your Email' style={styles.input} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name='lock-closed-outline' size={20} color='#6B7280' style={styles.icon} />
        <TextInput placeholder='Password' style={styles.input} secureTextEntry />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Main')} style={styles.touch}>
        <Text style={styles.text}> Sign In</Text>
      </TouchableOpacity>
      <Text style={{ marginBottom: 10, marginTop: 10 }}>--------------------or -----------------------</Text>
      <TouchableOpacity onPress={() => navigation.navigate('PasswordScreen')}>
        <Text style={{ color: '#1C64F2', marginBottom: 10, marginTop: 15 }}> Forgot password?</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row' }}>
        <Text>Don't have an account yet?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={{ color: '#1C64F2' }}> Create Account </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 30,
    color: '#1C2A3A',
    fontWeight: 'bold',
  },
  subTitulo: {
    fontSize: 10,
    color: '#6B7280',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingStart: 10,
    color: '#333',
  },
  icon: {
    marginRight: 10,
  },
  touch: {
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#1C2A3A',
    alignItems: 'center',
    borderRadius: 30,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});
export default LoginScreen;
