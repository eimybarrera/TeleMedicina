import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TabButton from './components/TabButton.js';
import { FavoritesProvider } from './src/screens/FavoritesContext.js';

// Importación de pantallas
import AllDoctorScreen from './src/screens/AllDoctorScreen.js';
import AppointmentsScreen from './src/screens/AppointmentScreen.js';
import BookAppointmentScreen from './src/screens/BookAppointmentScreen.js';
import DoctorCenter from './src/screens/DoctorCenter.js';
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
import MedicalCenters from './src/screens/medicalCenters.js';

// Navegación de autenticación
const AuthStack = createNativeStackNavigator();

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
    </AuthStack.Navigator>
  </SafeAreaView>
);

// Navegación principal
const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator initialRouteName='Home'>
      <HomeStack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name='AllDoctor' component={AllDoctorScreen} />
      <HomeStack.Screen name='DoctorDetails' component={InfoDoctorScreen} />
      <HomeStack.Screen name='BookAppointment' component={BookAppointmentScreen} />
      <HomeStack.Screen name='Favorites' component={FavoritesScreen} />
      <HomeStack.Screen name='espes' component={espes} />
      <HomeStack.Screen name='MedicalCenters' component={MedicalCenters} />
      <HomeStack.Screen name='DoctorCenter' component={DoctorCenter} />
    </HomeStack.Navigator>
  );
};

// Navegación de pestañas
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const tabs = [
    { id: 1, name: 'Home', component: HomeStackScreen, icon: 'home', color: '#877EA1' },
    { id: 2, name: 'Appointments', component: AppointmentsScreen, icon: 'calendar', color: '#B77B7E' },
    { id: 3, name: 'Centers', component: MedicalCenters, icon: 'hospital-building', color: '#C6CACC' },
    { id: 4, name: 'Profile', component: ProfileScreen, icon: 'account-circle', color: '#81C995' },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle:
            route.name === 'Home' ||
            route.name === 'Appointments' ||
            route.name === 'Centers' ||
            route.name === 'Profile'
              ? styles.tabBar
              : { display: 'none' },
        })}
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

// Componente principal
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <FavoritesProvider>
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
  );
}

// Estilos
const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    position: 'absolute',
    bottom: 0,
    marginHorizontal: 16,
    borderRadius: 10,
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderColor: '#dadada',
  },
});
