import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const AppointmentsScreen = () => {
const [appointments, setAppointments] = useState([
    { id: '1', doctor: 'Dr. Carlos López', date: '2024-10-15', time: '10:00 AM', specialty: 'Cardiología' },
    { id: '2', doctor: 'Dra. Ana Pérez', date: '2024-10-20', time: '2:00 PM', specialty: 'Dermatología' },
    // Podemos conectarlo con la bd
]);

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
    <Text style={styles.title}>Mis Citas</Text>
    <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
        style={styles.list}
    />
    <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Agendar Nueva Cita</Text>
    </TouchableOpacity>
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
button: {
    backgroundColor: '#1C64F2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
},
buttonText: {
    color: '#fff',
    fontSize: 18,
},
});

export default AppointmentsScreen;
