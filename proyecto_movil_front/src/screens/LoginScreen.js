import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Hi, Welcome Back!</Text>
      <Text style={styles.subTitulo}> Hope you're doing fine</Text>
      <TextInput placeholder="Your Emain" style={styles.imput} />
      <TextInput placeholder="Password" style={styles.imput} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        style={styles.touch}
      >
        <Text style={styles.text}> Sign In</Text>
      </TouchableOpacity>
      <Text>Don't have an account yet?</Text>{" "}
      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text> Ir a registrarme </Text>
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
});
export default LoginScreen;
