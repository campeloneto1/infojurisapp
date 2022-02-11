import React, { Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Platform } from 'react-native';

import Cadastrese from './src/components/Cadastrese/';
import Inicio from './src/components/Inicio/';
import Login from './src/components/Login/';
import Menu from './src/components/Menu/';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs(){

  return (
    <Tab.Navigator>
      
      <Tab.Screen 
        name="Início" 
        component={Inicio} 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons size={20} style={styles.icon} name="home"  />
            ), }}
        /> 

      <Tab.Screen 
        name="Menu" 
        component={Menu} 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons size={20} style={styles.icon} name="format-align-justify"  />
            ), }}
        /> 
      
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Fragment>
        <NavigationContainer >
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Login"  component={Login}  />
            <Stack.Screen name="Inicio" component={Tabs}  />   
            <Stack.Screen name="Cadastre-se"  component={Cadastrese}  />                 
          </Stack.Navigator>
        </NavigationContainer>  
      
    </Fragment>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
  icon: {
    
  },
  bar:{
    backgroundColor: '#E1E2E1',
  }
});
