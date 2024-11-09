import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const AppointmentsScreen = () => {
const [appointments, setAppointments] = useState([]);
const navigation = useNavigation();

useEffect(() => {
    const fetchAppointments = async () => {
    try {
        const patientId = await AsyncStorage.getItem('patientId');
        if (patientId) {
        const response = await fetch(`http://localhost:3000/citas/paciente/${patientId}`);
        const data = await response.json();
        setAppointments(data);
        }
    } catch (error) {
        console.error("Error al obtener citas:", error);
    }
    };

    fetchAppointments();
}, []);

const handleEditAppointment = (appointment) => {
    // Navegar a una pantalla de edición, pasando los detalles de la cita
    navigation.navigate('EditAppointment', { appointment });
};

const handleDeleteAppointment = async (appointmentId) => {
    try {
    const response = await fetch(`http://localhost:3000/citas/${appointmentId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        setAppointments(appointments.filter((appointment) => appointment.id_cita !== appointmentId));
        Alert.alert("Cita eliminada", "La cita ha sido eliminada con éxito.");
    } else {
        Alert.alert("Error", "No se pudo eliminar la cita.");
    }
    } catch (error) {
    console.error("Error al eliminar cita:", error);
    Alert.alert("Error", "Ocurrió un error al intentar eliminar la cita.");
    }
};

const renderAppointment = ({ item }) => (
    <View style={styles.appointmentContainer}>
        <Text style={styles.text}>Doctor: {item.doctor}</Text>
        <Text style={styles.text}>Especialidad: {item.especialidad}</Text>
        <Text style={styles.text}>Fecha: {item.date}</Text>
        <Text style={styles.text}>Hora: {item.time}</Text>
        <Text style={[styles.text, getStatusStyle(item.estado)]}>Estado: {item.estado}</Text>
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => handleEditAppointment(item)}>
                <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteAppointment(item.id_cita)}>
                <Text style={styles.buttonText}>Eliminar</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const getStatusStyle = (estado) => {
    switch (estado) {
        case 'confirmada':
            return { color: 'green' };
        case 'pendiente':
            return { color: 'orange' };
        case 'cancelada':
            return { color: 'red' };
        default:
            return { color: 'black' };
    }
};

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
        keyExtractor={(item) => item.id_cita.toString()}
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
buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
},
editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
},
deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
},
buttonText: {
    color: '#fff',
    fontWeight: 'bold',
},
});

export default AppointmentsScreen;
