import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const PasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = () => {
    if (newPassword === confirmPassword) {
      // Agregar la lógica y conectadar la bd
      alert('Contraseña cambiada exitosamente.');
      navigation.navigate('LoginScreen'); 
    } else {
      alert('Las contraseñas no coinciden');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cambiar Contraseña</Text>
      <TextInput
        placeholder="Nueva Contraseña"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Confirmar Contraseña"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleChangePassword} style={styles.button}>
        <Text style={styles.buttonText}>Cambiar Contraseña</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1C64F2',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PasswordScreen;
