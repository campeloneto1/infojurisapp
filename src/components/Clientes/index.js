import React, {useState} from 'react';
import { Text, View, SafeAreaView,FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../environments/';
import { useNavigation } from '@react-navigation/native';
import Itens from './Itens/';
import styles from './styles';

export default function Clientes() {
  const navigation = useNavigation(); 
  const [clientes, setClientes] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getClientes();
      
    }, [])
  );

  async function getClientes(){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'clientes',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+result
      }
    }).then((response) => response.json())
    .then((json) => {   
      //console.log(json)                
      if(json){
        setClientes(json);        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });

    
  }

  return (
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>Clientes</Text> 
            <Pressable style={styles.voltar} onPress={() => {navigation.navigate('Menu')}}>
              <MaterialCommunityIcons size={35} name="arrow-left" color = {'white'}   />
            </Pressable> 
        </View> 
        <View style={styles.containerBody}>
       
          <FlatList style={styles.list}
              data={clientes}
              renderItem={({item})=>{
                return <Itens 
                  getclientes={getClientes}
                  nome={item.nome}    
                  cpf={item.cpf}  
                  telefone1={item.telefone1}   
                  mae={item.mae}                            
                  id={item.id} 
                  
                  />
            }}
            />
            <TouchableOpacity  
                onPress={()=> navigation.navigate('Cadastrar Cliente')} 
                style={styles.btncadastrar}
            >
              <MaterialCommunityIcons size={50} name="plus" color = {'white'} style={styles.cadastrar}  />
            </TouchableOpacity> 

        </View>        
    </SafeAreaView>
  );
}