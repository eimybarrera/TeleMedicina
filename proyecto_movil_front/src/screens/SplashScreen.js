import React, { useEffect } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Importa useNavigation para navegar

const SplashScreen = () => {
  const navigation = useNavigation(); // Hook para la navegación

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("StartScreen"); // Redirige a la StartScreen
    }, 4000); // 3 segundos antes de redirigir
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.containerBox]}>
        <View
          style={[
            styles.box,
            { backgroundColor: "#877EA1", flex: 1, marginLeft: 10 },
          ]}
        ></View>
        <View style={[styles.box, { backgroundColor: "#C6CACC", flex: 2 }]}>
          <Image
            source={require("../../assets/docBlanco.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View
          style={[styles.box, { backgroundColor: "#B77B7E", flex: 1 }]}
        ></View>
      </View>
      <View style={[styles.containerBox]}>
        <View
          style={[
            styles.box,
            { backgroundColor: "#4E735C", flex: 1, marginLeft: 10 },
          ]}
        >
          <Image
            source={require("../../assets/docVerde.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={[styles.box, { backgroundColor: "#251844", flex: 2 }]}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/logoBlanco.png")}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              marginBottom: 15,
              color: "#F5FFF5",
              marginLeft: 35,
            }}
          >
            HealthPal
          </Text>
        </View>
        <View style={[styles.box, { backgroundColor: "#A79190", flex: 1 }]}>
          <Image
            source={require("../../assets/docRosa.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
      <View style={[styles.containerBox]}>
        <View
          style={[
            styles.box,
            { backgroundColor: "#5A4741", flex: 1, marginLeft: 10 },
          ]}
        ></View>
        <View style={[styles.box, { backgroundColor: "#71503B", flex: 2 }]}>
          <Image
            source={require("../../assets/docNaranja.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View
          style={[styles.box, { backgroundColor: "#234742", flex: 1 }]}
        ></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#140014",
    flexDirection: "column",
    //justifyContent: "space-around",
    // alignItems:"stretch"
  },
  box: {
    height: 240,
    width: 80,
    marginRight: 10,
    borderRadius: 20,
  },
  containerBox: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "space-around",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  imageContainer: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 30,
  },
});

export default SplashScreen;
