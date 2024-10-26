import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-web';
import doctorsData from './database/database';
import patientReviews from './database/reviews';

const CircleInfo = ({ doctor }) => (
  <View style={styles.info}>
    <View style={styles.box}>
      <View style={styles.circle}>{<FontAwesome5 name='hospital-user' size={24} color='black' />}</View>
      <Text style={styles.text}>{doctor.patients}+</Text>
      <Text>Patients</Text>
    </View>
    <View style={styles.box}>
      <View style={styles.circle}>{<FontAwesome5 name='medal' size={24} color='black' />}</View>
      <Text style={styles.text}>{doctor.experience}+</Text>
      <Text>Experience</Text>
    </View>
    <View style={styles.box}>
      <View style={styles.circle}>{<FontAwesome5 name='star' size={24} color='black' />}</View>
      <Text style={styles.text}>{doctor.rating}</Text>
      <Text>Rating</Text>
    </View>
    <View style={styles.box}>
      <View style={styles.circle}>{<FontAwesome5 name='comment' size={24} color='black' />}</View>
      <Text style={styles.text}>{doctor.reviews}+</Text>
      <Text>Review</Text>
    </View>
  </View>
);

const renderDoctorCard = (doctor) => (
  <View style={styles.card} key={doctor.id}>
    <View style={styles.cardContainer}>
      <Image source={{ uri: doctor.imageUrl }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}>{doctor.specialty}</Text>
        <Text style={styles.center}>{doctor.medicalCenter}</Text>
      </View>
    </View>
  </View>
);

const InfoDoctorScreen = ({ route }) => {
  const navigation = useNavigation();
  const { doctorId } = route.params;
  const doctor = doctorsData.find((doc) => doc.id === doctorId);
  const review = patientReviews.find((doc) => doc.doctorId === doctorId);

  if (!doctor) {
    return (
      <View>
        <Text>Doctor no encontrado.</Text>
      </View>
    );
  }

  // Datos para el FlatList
  const data = [
    {
      key: 'aboutMe',
      content: (
        <View style={styles.box2}>
          <Text style={styles.title}>About me</Text>
          <Text style={styles.text1}>{doctor.aboutMe}</Text>
        </View>
      ),
    },
    {
      key: 'workingTime',
      content: (
        <View style={styles.box2}>
          <Text style={styles.title}>Working Time</Text>
          <Text style={styles.text1}>{doctor.workHours}</Text>
        </View>
      ),
    },
    {
      key: 'reviews',
      content: (
        <View style={styles.box2}>
          <Text style={styles.title}>Reviews</Text>
          <View>
            <View style={styles.cardReview}>
              <Image source={{ uri: doctor.imageUrl }} style={styles.imageReview} />
              <View style={styles.namecard}>
                <Text style={styles.text}>{review.patient.name}</Text>
                <Text style={styles.text}>★ {review.patient.rating}</Text>
              </View>
            </View>
            <Text style={styles.text1}>{review.patient.comment}</Text>
          </View>
        </View>
      ),
    },
  ];

  // Función para renderizar cada ítem del FlatList
  const renderItem = ({ item }) => <View style={{ marginVertical: 10 }}>{item.content}</View>;

  return (
    <View style={styles.container}>
      {renderDoctorCard(doctor)} {/* Mostrar la tarjeta del doctor */}
      <CircleInfo doctor={doctor} /> {/* Mostrar CircleInfo */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        ListFooterComponent={
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Book Appointment')}>
            <Text style={styles.buttontext}>Book Appointment</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
  },
  imageReview: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#e0e0e0',
    padding: 20,
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardReview: {
    flexDirection: 'row',
    margin: 0,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  specialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  center: {
    fontSize: 12,
    color: '#999',
    marginBottom: 5,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30, // La mitad del ancho/alto para hacerlo redondo
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  info: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  box: {
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  box2: {
    padding: 0,
    marginVertical: 0,
    width: '95%',
    alignSelf: 'center',
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#1c2a3a',
    width: '90%',
    padding: 10,
    borderRadius: 15,
  },
  buttontext: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  namecard: {
    flexDirection: 'column',
    marginLeft: 20,
  },
});

export default InfoDoctorScreen;
