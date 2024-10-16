import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import AllDoctorScreen from './src/screens/AllDoctorScreen';
import AppointmentsScreen from './src/screens/AppointmentScreen';
import BookAppointmentScreen from './src/screens/BookAppointmentScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import HomeScreen from './src/screens/HomeScreen';
import InfoDoctorScreen from './src/screens/InfoDoctor';
import LoginScreen from './src/screens/LoginScreen';
import PasswordScreen from './src/screens/PasswordScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SplashScreen from './src/screens/SplashScreen';
import StartScreen from './src/screens/StartScreen';

// Stack Navigator para las pantallas de autenticación (Inicio, Registro, Login)
const AuthStack = createNativeStackNavigator();
const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName='SplashScreen'>
    <AuthStack.Screen name='StartScreen' component={StartScreen} />
    <AuthStack.Screen name='RegisterScreen' component={RegisterScreen} />
    <AuthStack.Screen name='LoginScreen' component={LoginScreen} />
    <AuthStack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name='PasswordScreen' component={PasswordScreen} />
    <AuthStack.Screen name='All Doctor' component={AllDoctorScreen} />
    <AuthStack.Screen name='Doctor Details' component={InfoDoctorScreen} />
    <AuthStack.Screen name='Book Appointment' component={BookAppointmentScreen} />
  </AuthStack.Navigator>
);

// Bottom Tab Navigator para las pantallas después de iniciar sesión (Home, Profile)
const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName='Home'
    screenOptions={{
      tabBarActiveTintColor: 'green',
      tabBarInactiveTintColor: 'red',
    }}
  >
    <Tab.Screen
      name='Home'
      component={HomeScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name='home' size={size} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name='Profile'
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name='user' size={size} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name='Appointments'
      component={AppointmentsScreen}
      options={{
        tabBarLabel: 'Appointments',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name='user' size={size} color={color} />,
        headerShown: false,
      }}
    />
    <Tab.Screen
      name='Favorites'
      component={FavoritesScreen}
      options={{
        tabBarLabel: 'Favorites',
        tabBarIcon: ({ color, size }) => <FontAwesome5 name='user' size={size} color={color} />,
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);

// Navegación principal
export default function Navigation() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name='AuthStack' component={AuthStackScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name='Main' component={TabNavigator} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
