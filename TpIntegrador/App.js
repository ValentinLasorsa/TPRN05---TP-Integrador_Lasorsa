import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ConfiguracionScreen from './src/screens/ConfiguracionScreen';
import CambioFondoScreen from './src/screens/CambioFondoScreen';
import AcercaDeScreen from './src/screens/AcercaDeScreen'
import EmergenciaScreen from './src/screens/EmergenciaScreen'
import MultimediaScreen from './src/screens/MultimediaScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Configuración') {
                iconName = focused ? 'cog' : 'cog-outline';
              } 
              else if (route.name === 'Imagen fondo') {
                iconName = focused ? 'image' : 'image-outline';
              }
              else if(route.name === 'Video'){
                iconName = focused ? 'play-circle' : 'play-circle-outline'
              }
              else if (route.name === 'Emergente') {
                iconName = focused ? 'call' : 'call-outline';
              } 
              else if(route.name === 'Barcode'){
                iconName = focused ? 'md-barcode' : 'md-barcode-outline'
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Configuración" component={ConfiguracionScreen} />
          <Tab.Screen name="Imagen fondo" component={CambioFondoScreen}/>
          <Tab.Screen name="Barcode" component={AcercaDeScreen}/>
          <Tab.Screen name="Emergente" component={EmergenciaScreen} />
          <Tab.Screen name="Video" component={MultimediaScreen}/>
        </Tab.Navigator>
  </NavigationContainer>

  );
};


export default App;