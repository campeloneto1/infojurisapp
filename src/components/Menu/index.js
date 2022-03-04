import React, {useState} from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Menu() {

  const navigation = useNavigation(); 
  const [gestor, setGestor] = useState(0);
  const [administrador, setAdministrador] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      getPerfil();      
    }, [])
  );

  async function getPerfil(){
    let data = await  SecureStore.getItemAsync('gestor');   
    let data2 = await  SecureStore.getItemAsync('administrador');    
    setGestor(data);
    setAdministrador(data2)
  }

  return (
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerBody}>
          <Text style={styles.title}>Menu</Text> 

          <View style={styles.containerMenus}>
                      
              <TouchableOpacity style={styles.menu}>
                <Text 
                style={styles.textmenu}
                onPress={() => {navigation.navigate('Clientes');}}
                >Clientes</Text>
              </TouchableOpacity>
              {administrador == '1' && (      
                <TouchableOpacity 
                style={styles.menu}
                onPress={() => {navigation.navigate('Escritorios');}}
                >
                  <Text style={styles.textmenu}>Escritórios</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity 
              style={styles.menu}
              onPress={() => {navigation.navigate('Processos');}}
              >
                <Text style={styles.textmenu}>Processos</Text>
              </TouchableOpacity>
              {gestor == '1' && (      
                <TouchableOpacity 
                style={styles.menu}
                onPress={() => {navigation.navigate('Usuarios');}}
                >
                  <Text style={styles.textmenu}>Usuários</Text>
                </TouchableOpacity>
              )}
          </View>
       
        </View>
        
    </SafeAreaView>
  );
}