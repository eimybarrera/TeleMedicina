import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
<<<<<<< Updated upstream
=======
import { SafeAreaView, StyleSheet } from 'react-native';
import TabButton from './components/TabButton.js';
import { FavoritesProvider } from './src/screens/FavoritesContext.js';
>>>>>>> Stashed changes

import AllDoctorScreen from './src/screens/AllDoctorScreen';
import HomeScreen from './src/screens/HomeScreen';
import InfoDoctorScreen from './src/screens/InfoDoctor';
import LoginScreen from './src/screens/LoginScreen';
import PasswordScreen from './src/screens/PasswordScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import SplashScreen from './src/screens/SplashScreen';
import StartScreen from './src/screens/StartScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import AppointmentsScreen from './src/screens/AppointmentScreen';

// Stack Navigator para las pantallas de autenticación (Inicio, Registro, Login)
const AuthStack = createNativeStackNavigator();
<<<<<<< Updated upstream
const AuthStackScreen = () => (
  <AuthStack.Navigator initialRouteName='SplashScreen'>
    <AuthStack.Screen name='StartScreen' component={StartScreen} />
    <AuthStack.Screen name='RegisterScreen' component={RegisterScreen} />
    <AuthStack.Screen name='LoginScreen' component={LoginScreen} />
    <AuthStack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name='PasswordScreen' component={PasswordScreen} />
    <AuthStack.Screen name='All Doctor' component={AllDoctorScreen} />
    <AuthStack.Screen name='Doctor Details' component={InfoDoctorScreen} />
  </AuthStack.Navigator>
=======
const AuthStackScreen = ({ setIsAuthenticated }) => (
  <SafeAreaView style={{ flex: 1 }}>
    <AuthStack.Navigator initialRouteName='SplashScreen'>
      <AuthStack.Screen name='StartScreen' component={StartScreen} />
      <AuthStack.Screen name='RegisterScreen' component={RegisterScreen} />
      <AuthStack.Screen
        name='LoginScreen'
        component={(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
      />
      <AuthStack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name='PasswordScreen' component={PasswordScreen} />
      <AuthStack.Screen name='All Doctor' component={AllDoctorScreen} />
      <AuthStack.Screen name='Doctor Details' component={InfoDoctorScreen} />
      <AuthStack.Screen name='Book Appointment' component={BookAppointmentScreen} />
    </AuthStack.Navigator>
  </SafeAreaView>
>>>>>>> Stashed changes
);

const HomeStack= createNativeStackNavigator();
function HomeStackScreen(){
  return(
    <HomeStack.Navigator initialRouteName='Home'>
<<<<<<< Updated upstream
      <AuthStack.Screen name='Home' component={HomeScreen}  options={{ headerShown: false }}/>
      <AuthStack.Screen name='All Doctor' component={AllDoctorScreen}  />
      <AuthStack.Screen name='Doctor Details' component={InfoDoctorScreen} />
      <AuthStack.Screen name='Book Appointment' component={BookAppointmentScreen} />
      <AuthStack.Screen name='Favorites' component={FavoritesScreen} />
=======
      <HomeStack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name='All Doctor' component={AllDoctorScreen} />
      <HomeStack.Screen name='Doctor Details' component={InfoDoctorScreen} />
      <HomeStack.Screen name='Book Appointment' component={BookAppointmentScreen} />
      <HomeStack.Screen name='Favorites' component={FavoritesScreen} />
      <HomeStack.Screen name='espes' component={espes} />
>>>>>>> Stashed changes
    </HomeStack.Navigator>
  )
}
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
      name="Appointments"
      component={AppointmentsScreen}
      options={{
        tabBarLabel: "Appointments",
        tabBarIcon: ({ color, size }) => <FontAwesome5 name='user' size={size} color={color} />,
        headerShown: false,
      }}
    />
    
  </Tab.Navigator>
);

// Navegación principal
export default function Navigation() {
  return (
<<<<<<< Updated upstream
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name='AuthStack' component={AuthStackScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name='Main' component={TabNavigator} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    </NavigationContainer>
=======
    <FavoritesProvider> {/* <--- Aquí envuelves la navegación con el Provider */}
      <NavigationContainer>
        <AuthStack.Navigator>
          <AuthStack.Screen
            name='AuthStack'
            component={() => <AuthStackScreen setIsAuthenticated={setIsAuthenticated} />}
            options={{ headerShown: false }}
          />
          <AuthStack.Screen name='Main' component={TabNavigator} options={{ headerShown: false }} />
        </AuthStack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
>>>>>>> Stashed changes
  );
}
