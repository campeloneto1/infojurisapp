import React, { Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Platform } from 'react-native';
import Toast from 'react-native-toast-message';

import Cadastrese from './src/components/Cadastrese/';
import Inicio from './src/components/Inicio/';
import Login from './src/components/Login/';
import Menu from './src/components/Menu/';

import Clientes from './src/components/Clientes/';
import CadastrarCliente from './src/components/Clientes/Cadastrar/';
import EditarCliente from './src/components/Clientes/Editar/';

import Escritorios from './src/components/Escritorios/';
import CadastrarEscritorio from './src/components/Escritorios/Cadastrar/';
import EditarEscritorio from './src/components/Escritorios/Editar/';

import Processos from './src/components/Processos/';
import CadastrarProcesso from './src/components/Processos/Cadastrar/';
import EditarProcesso from './src/components/Processos/Editar/';

import Usuarios from './src/components/Usuarios/';
import CadastrarUsuario from './src/components/Usuarios/Cadastrar/';
import EditarUsuario from './src/components/Usuarios/Editar/';


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

            <Stack.Screen name="Clientes"  component={Clientes}  />  
            <Stack.Screen name="Cadastrar Cliente"  component={CadastrarCliente}  />  
            <Stack.Screen name="Editar Cliente"  component={EditarCliente}  /> 
            
            <Stack.Screen name="Escritorios"  component={Escritorios}  />  
            <Stack.Screen name="Cadastrar Escritorio"  component={CadastrarEscritorio}  />  
            <Stack.Screen name="Editar Escritorio"  component={EditarEscritorio}  />  

            <Stack.Screen name="Processos"  component={Processos}  />  
            <Stack.Screen name="Cadastrar Processo"  component={CadastrarProcesso}  />  
            <Stack.Screen name="Editar Processo"  component={EditarProcesso}  />  
            
            <Stack.Screen name="Usuarios"  component={Usuarios}  />    
            <Stack.Screen name="Cadastrar Usuario"  component={CadastrarUsuario}  />  
            <Stack.Screen name="Editar Usuario"  component={EditarUsuario}  />                 
          </Stack.Navigator>
        </NavigationContainer>  
        <Toast style={styles.toast} />
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
  },
  toast: {
    fontSize: 50,
  },
});
