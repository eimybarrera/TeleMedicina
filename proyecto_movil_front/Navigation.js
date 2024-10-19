import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TabButton from './components/TabButton.js';

import AllDoctorScreen from './src/screens/AllDoctorScreen.js';
import AppointmentsScreen from './src/screens/AppointmentScreen.js';
import BookAppointmentScreen from './src/screens/BookAppointmentScreen.js';
import FavoritesScreen from './src/screens/FavoritesScreen.js';
import HomeScreen from './src/screens/HomeScreen.js';
import InfoDoctorScreen from './src/screens/InfoDoctor.js';
import LoginScreen from './src/screens/LoginScreen.js';
import PasswordScreen from './src/screens/PasswordScreen.js';
import ProfileScreen from './src/screens/ProfileScreen.js';
import RegisterScreen from './src/screens/RegisterScreen.js';
import SplashScreen from './src/screens/SplashScreen.js';
import StartScreen from './src/screens/StartScreen.js';
import espes from './src/screens/espes.js';

const AuthStack = createNativeStackNavigator();
const AuthStackScreen = ({ setIsAuthenticated }) => (
  <SafeAreaView style={{ flex: 1 }}>
    <AuthStack.Navigator initialRouteName='SplashScreen'>
      <AuthStack.Screen name='StartScreen' component={StartScreen} />
      <AuthStack.Screen name='RegisterScreen' component={RegisterScreen} />
      <AuthStack.Screen
        name='LoginScreen'
        component={(props) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />} // Pasamos el prop
      />
      <AuthStack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
      <AuthStack.Screen name='PasswordScreen' component={PasswordScreen} />
      <AuthStack.Screen name='All Doctor' component={AllDoctorScreen} />
      <AuthStack.Screen name='Doctor Details' component={InfoDoctorScreen} />
      <AuthStack.Screen name='Book Appointment' component={BookAppointmentScreen} />
      <AuthStack.Screen name='espes' component={espes} />
    </AuthStack.Navigator>
  </SafeAreaView>
);

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabs = [
    { id: 1, name: 'Home', component: HomeScreen, icon: 'home', color: '#877EA1' }, // Rosa suave
    { id: 2, name: 'Appointments', component: AppointmentsScreen, icon: 'calendar', color: '#B77B7E' }, // Naranja suave
    { id: 3, name: 'Favorites', component: FavoritesScreen, icon: 'star', color: '#C6CACC' }, // Amarillo suave
    { id: 4, name: 'Profile', component: ProfileScreen, icon: 'account-circle', color: '#81C995' }, // Verde suave
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
        }}
      >
        {tabs.map((item) => (
          <Tab.Screen
            key={item.id}
            name={item.name}
            component={item.component}
            options={{
              tabBarButton: (props) => <TabButton item={item} {...props} />,
            }}
          />
        ))}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name='AuthStack' component={AuthStackScreen} options={{ headerShown: false }} />
        <AuthStack.Screen name='Main' component={TabNavigator} options={{ headerShown: false }} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

// Estilos
const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 25,
    marginHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderColor: '#dadada',
  },
});
