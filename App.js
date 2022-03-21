import React, { Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleSheet, Platform } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import Toast from 'react-native-toast-message';

import Cadastrese from './src/components/Cadastrese/';
import Inicio from './src/components/Inicio/';
import Login from './src/components/Login/';
import Menu from './src/components/Menu/';

import Audiencias from './src/components/Audiencias/';
import CadastrarAudiencia from './src/components/Audiencias/Cadastrar/';
import EditarAudiencia from './src/components/Audiencias/Editar/';

import Calendario from './src/components/Calendario/';

import Clientes from './src/components/Clientes/';
import CadastrarCliente from './src/components/Clientes/Cadastrar/';
import EditarCliente from './src/components/Clientes/Editar/';

import Escritorios from './src/components/Escritorios/';
import CadastrarEscritorio from './src/components/Escritorios/Cadastrar/';
import EditarEscritorio from './src/components/Escritorios/Editar/';

import Processo from './src/components/Processo/';

import Processos from './src/components/Processos/';
import CadastrarProcesso from './src/components/Processos/Cadastrar/';
import EditarProcesso from './src/components/Processos/Editar/';

import Tribunais from './src/components/Tribunais/';
import CadastrarTribunal from './src/components/Tribunais/Cadastrar/';
import EditarTribunal from './src/components/Tribunais/Editar/';

import Usuarios from './src/components/Usuarios/';
import CadastrarUsuario from './src/components/Usuarios/Cadastrar/';
import EditarUsuario from './src/components/Usuarios/Editar/';


const Stack = createNativeStackNavigator ();
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
        name="Calendário" 
        component={Calendario} 
        options={{ 
          headerShown: false, 
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons size={20} style={styles.icon} name="calendar-month-outline"  />
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
    <MenuProvider>
        <Fragment>
          <NavigationContainer >
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login"  component={Login}  />
              <Stack.Screen name="Inicio" component={Tabs}  />   
              <Stack.Screen name="Cadastre-se"  component={Cadastrese}  />
              
              <Stack.Screen name="Audiencias"  component={Audiencias}  />  
              <Stack.Screen name="Cadastrar Audiencia"  component={CadastrarAudiencia}  />  
              <Stack.Screen name="Editar Audiencia"  component={EditarAudiencia}  />  

              <Stack.Screen name="Calendario"  component={Calendario}  />   

              <Stack.Screen name="Clientes"  component={Clientes}  />  
              <Stack.Screen name="Cadastrar Cliente"  component={CadastrarCliente}  />  
              <Stack.Screen name="Editar Cliente"  component={EditarCliente}  /> 
              
              <Stack.Screen name="Escritorios"  component={Escritorios}  />  
              <Stack.Screen name="Cadastrar Escritorio"  component={CadastrarEscritorio}  />  
              <Stack.Screen name="Editar Escritorio"  component={EditarEscritorio}  />  

              <Stack.Screen name="Processo"  component={Processo}  />  

              <Stack.Screen name="Processos"  component={Processos}  />  
              <Stack.Screen name="Cadastrar Processo"  component={CadastrarProcesso}  />  
              <Stack.Screen name="Editar Processo"  component={EditarProcesso}  /> 

              <Stack.Screen name="Tribunais"  component={Tribunais}  />  
              <Stack.Screen name="Cadastrar Tribunal"  component={CadastrarTribunal}  />  
              <Stack.Screen name="Editar Tribunal"  component={EditarTribunal}  />  
              
              <Stack.Screen name="Usuarios"  component={Usuarios}  />    
              <Stack.Screen name="Cadastrar Usuario"  component={CadastrarUsuario}  />  
              <Stack.Screen name="Editar Usuario"  component={EditarUsuario}  />                 
            </Stack.Navigator>
          </NavigationContainer>  
          <Toast style={styles.toast} />
      </Fragment> 
    </MenuProvider>
     
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
