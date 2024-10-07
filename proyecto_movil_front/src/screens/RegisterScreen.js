import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,Image
} from "react-native";
const RegisterScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
      <Image 
        source={require('../../assets/profile.png')}
        style={styles.image}
        resizeMode="cover" 
      />
      </View>
      <Text style={styles.titulo}>Create Account</Text>
      <Text style={styles.subTitulo}> We are here to help you!</Text>
      <TextInput placeholder="Your Name" style={styles.imput} />
      <TextInput placeholder="Your Email" style={styles.imput} />
      <TextInput placeholder="Your Password" style={styles.imput} />
      <TextInput placeholder="Your Emain" style={styles.imput} />
      <TextInput placeholder="Date of Birth" style={styles.imput} />
      <TextInput placeholder="Gender" style={styles.imput} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        style={styles.touch}
      >
        <Text style={styles.text}> Sign In</Text>
      </TouchableOpacity>
    </View>
  )
}
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
  imput: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
  },
  touch: {
    padding: 10,
    paddingStart: 30,
    width: "80%",
    height: 50,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: "#1C2A3A",
    justifyContent: "center",
    borderRadius: 30,
  },
  text: {
    color: "#FFFFFF",
  },
  image: {
    width: '100%', 
    height: '100%', 
  },
  imageContainer: {
    width: 150,  
    height: 150, 
    marginBottom: 20,
  },
});
export default RegisterScreen