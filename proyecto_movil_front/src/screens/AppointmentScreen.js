import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AppointmentsScreen = ({route}) => {
const [appointments, setAppointments] = useState([]);
const { id_paciente } = route.params;

const navigation = useNavigation();

// useEffect(() => {
//     fetch(`http://localhost:3000/citas/${id_paciente}`)
//     .then((response) => response.json())
//     .then((data) => setAppointments(data))
//     .catch((error) => console.error('Error fetching appointments:', error));
// }, [id_paciente]);

const renderAppointment = ({ item }) => (
    <View style={styles.appointmentContainer}>
        <Text style={styles.text}>Doctor: {item.doctor}</Text>
        <Text style={styles.text}>Especialidad: {item.specialty}</Text>
        <Text style={styles.text}>Fecha: {item.date}</Text>
        <Text style={styles.text}>Hora: {item.time}</Text>
    </View>
);

return (
    <View style={styles.container}>
    <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <FontAwesome name="arrow-left" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Appointments</Text>
    </View>
    <View style={styles.divider} />
    <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
    />
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
},
backButton: {
    marginBottom: 20,
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
},
title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10, 
},
divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
},
appointmentContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
},
text: {
    fontSize: 16,
},
});

export default AppointmentsScreen;
