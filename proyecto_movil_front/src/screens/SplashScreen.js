import React, { useEffect } from 'react';
import { Text, View, Image, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';  // Importa useNavigation para navegar

const SplashScreen = () => {
  const navigation = useNavigation();  // Hook para la navegación

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("StartScreen");  // Redirige a la StartScreen
    }, 3000);  // 3 segundos antes de redirigir
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}> Esta es nuestra aplicacion </Text>
      <Text style={styles.subTitulo}>Eimy Garcia</Text>
      <Text style={styles.subTitulo}>Maria Fernanda Valencia</Text>
      <Text style={styles.subTitulo}>Valentina Aria </Text>
      <Text style={styles.subTitulo}>Manuela </Text>
      <Text style={styles.loading}> Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#DAB7B6'
  },
  titulo: {
    fontSize: 30,
    color: "#34435D",
    fontWeight: "bold",
  },
  subTitulo: {
    fontSize: 20,
    color: "gray",
    
  },
  loading:{
    marginTop:40
  }
});

export default SplashScreen;
