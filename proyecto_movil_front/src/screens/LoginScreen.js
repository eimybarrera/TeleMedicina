import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');

  const loginPatient = async () => {
    try {
      const response = await fetch('http://localhost:3000/pacientes/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          contraseña,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const userName = data.paciente.nombre; // Nombre del usuario
        const userEmail = data.paciente.email; // Email del usuario
        const userProfilePic = data.paciente.foto_perfil; // URL de la foto de perfil
        const patientId = data.paciente.id_paciente;
        await AsyncStorage.setItem('patientId', patientId.toString());
        console.log('Patient ID guardado en la base de datos:', patientId);
        setError('');
        // Navegamos a la pantalla de perfil y pasamos el nombre, el email y la foto de perfil
        navigation.navigate('Main', { screen: 'Profile', params: { userName, userEmail, userProfilePic } });
      } else {
        setError(data.error || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setError('Error de conexión con el servidor');
    }
  };
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
        <TextInput placeholder='Your Email' style={styles.input} value={email} onChangeText={setEmail} />
      </View>

      <View style={styles.inputContainer}>
        <Icon name='lock-closed-outline' size={20} color='#6B7280' style={styles.icon} />
        <TextInput
          placeholder='Password'
          style={styles.input}
          secureTextEntry
          value={contraseña}
          onChangeText={setContraseña}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity onPress={loginPatient} style={styles.touch}>
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
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
