import React, { useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Función para obtener los días en el mes
const getDaysInMonth = (month, year) => {
  const date = new Date(year, month, 1);
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

// Función para obtener los días en blanco necesarios para que el 1 caiga en martes
const getEmptyDays = (startDay) => {
  const emptyDays = [];
  for (let i = 0; i < startDay; i++) {
    emptyDays.push(null);
  }
  return emptyDays;
};

const BookAppointmentScreen = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const daysInMonth = getDaysInMonth(today.getMonth(), today.getFullYear());
  const startDay = 2;
  const emptyDays = getEmptyDays(startDay);
  const calendarDays = [...emptyDays, ...daysInMonth];

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderDay = ({ item }) => {
    if (!item) {
      return <View style={styles.dayContainer} />;
    }

    const isToday = item.toDateString() === today.toDateString();
    const isSelected = item.toDateString() === selectedDate.toDateString();

    return (
      <TouchableOpacity
        style={[styles.dayContainer, isToday && styles.today, isSelected && styles.selectedDay]}
        onPress={() => setSelectedDate(item)}
      >
        <Text style={styles.dayText}>{item.getDate()}</Text>
      </TouchableOpacity>
    );
  };

  const availableTimes = [
    '09:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
    '07:00 PM',
    '08:00 PM',
  ];

  const renderTimeOption = (time) => (
    <TouchableOpacity
      style={[styles.timeOption, selectedTime === time && styles.selectedTime]}
      onPress={() => setSelectedTime(time)}
    >
      <Text style={styles.timeText}>{time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.selectTimeText}>Select Date</Text>
      {/* Mostrar los días de la semana */}
      <View style={styles.weekContainer}>
        {daysOfWeek.map((day) => (
          <Text key={day} style={styles.weekDayText}>
            {day}
          </Text>
        ))}
      </View>
      <View>
        <FlatList
          data={calendarDays}
          renderItem={renderDay}
          keyExtractor={(item, index) => index.toString()}
          numColumns={7}
        />
      </View>
      <Text style={styles.selectTimeText}>Select Time:</Text>
      <View style={styles.timesContainer}>{availableTimes.map((time) => renderTimeOption(time))}</View>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={styles.buttontext}>Confirm</Text>
      </TouchableOpacity>

      <Modal animationType='slide' transparent={true} visible={isModalVisible} onRequestClose={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Congratulations!</Text>
            <Text style={styles.modalText}>
              Your appointment is confirmed for {selectedDate.toDateString()}, at {selectedTime}.
            </Text>
            <TouchableOpacity style={styles.button} onPress={toggleModal}>
              <Text style={styles.buttontext}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    margin: 20,
  },
  weekDayText: {
    width: 40,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dayContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 20,
  },
  today: {
    backgroundColor: '#f0f8ff',
  },
  selectedDay: {
    backgroundColor: '#1c2a3a',
  },
  selectedDateText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectTimeText: {
    marginTop: 0,
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'left',
  },
  timesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 5,
    margin: 5,
  },
  timeOption: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 5,
    width: '30%',
    alignItems: 'center',
  },
  selectedTime: {
    backgroundColor: '#1c2a3a',
  },
  selectedTimeText: {
    marginTop: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#1c2a3a',
    width: '90%',
    padding: 20,
    borderRadius: 15,
    margin: 15,
  },
  buttontext: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 15,
  },
});

export default BookAppointmentScreen;
