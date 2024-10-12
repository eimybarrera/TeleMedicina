import React, { useState } from 'react'
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
  const [selectedGender, setSelectedGender] = useState("");
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
      <TextInput placeholder="Your Name" style={styles.inputContainer} />
      <TextInput placeholder="Your Email" style={styles.inputContainer} />
      <TextInput placeholder="Your Password" style={styles.inputContainer} />
      <TextInput placeholder="Your Adress" style={styles.inputContainer} />
      <View style={styles.inputContainer}>
        <Icon
          name="calendar-outline"
          size={20}
          color="#6B7280"
          style={styles.icon}
        />
        <TextInput placeholder="Date of Birth" style={styles.input} />
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
      
      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        style={styles.touch}
      >
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
    justifyContent: "center",  // Para centrar verticalmente el Picker
  },
  picker: {
    height: 40,
    width: "100%",
  },
});
export default RegisterScreen;
