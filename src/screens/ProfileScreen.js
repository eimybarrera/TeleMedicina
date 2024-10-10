import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Profile = ({ navigation }) => {
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
