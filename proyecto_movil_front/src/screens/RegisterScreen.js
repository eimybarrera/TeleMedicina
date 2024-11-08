import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const registerPatient = async () => {
    try {
      const response = await fetch('http://localhost:3000/pacientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          email,
          contraseña,
          direccion,
          fecha_nacimiento: fechaNacimiento,
          genero: selectedGender,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Paciente creado:', data);
        navigation.navigate("Main"); // Navegar a la pantalla principal
      } else {
        console.error('Error al crear paciente:', data.error);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/profile.png")}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.titulo}>Create Account</Text>
      <Text style={styles.subTitulo}> We are here to help you!</Text>
      <TextInput
        placeholder="Your Name"
        style={styles.inputContainer}
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        placeholder="Your Email"
        style={styles.inputContainer}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Your Password"
        style={styles.inputContainer}
        secureTextEntry
        value={contraseña}
        onChangeText={setContraseña}
      />
      <TextInput
        placeholder="Your Address"
        style={styles.inputContainer}
        value={direccion}
        onChangeText={setDireccion}
      />
      <View style={styles.inputContainer}>
        <Icon
          name="calendar-outline"
          size={20}
          color="#6B7280"
          style={styles.icon}
        />
        <TextInput
          placeholder="Date of Birth: YYYY-MM-DD"
          style={styles.input}
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />
      </View>
      <View style={styles.inputContainer}>
        <Picker
          selectedValue={selectedGender}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedGender(itemValue)}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
      </View>

      <TouchableOpacity onPress={registerPatient} style={styles.touch}>
        <Text style={styles.text}> Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={{ color: "#1C64F2", size: 18 }}> Ir a LogIn </Text>
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
    fontSize: 28,
    color: "#34435D",
    fontWeight: "bold",
  },
  subTitulo: {
    fontSize: 15,
    color: "gray",
  },
  touch: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#1C2A3A",
    alignItems: "center",
    borderRadius: 30,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 130,
    height: 130,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    height: 40,
    marginTop: 15,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingStart: 10,
    color: "#333",
  },
  pickerContainer: {
    width: "80%",
    height: 40,
    backgroundColor: "#FFFFFF",
    marginTop: 15,
    borderRadius: 10,
    justifyContent: "center",
  },
  picker: {
    height: 40,
    width: "100%",
  },
});

export default RegisterScreen;
