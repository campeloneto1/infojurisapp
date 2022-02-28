import React, {useState} from 'react';
import { Text, View, SafeAreaView,FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../environments/';
import { useNavigation } from '@react-navigation/native';
import Itens from './Itens/';
import styles from './styles';

export default function Escritorios() {
  const navigation = useNavigation(); 
  const [escritorios, setEscritorios] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getEscritorios();
      
    }, [])
  );

  async function getEscritorios(){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'escritorios',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+result
      }
    }).then((response) => response.json())
    .then((json) => {                   
      if(json){
        setEscritorios(json);        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });

    
  }

  return (
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>Escritórios</Text> 
            <Pressable style={styles.voltar} onPress={() => {navigation.navigate('Menu')}}>
              <MaterialCommunityIcons size={35} name="arrow-left" color = {'white'}   />
            </Pressable> 
        </View> 
        <View style={styles.containerBody}>
       
          <FlatList style={styles.list}
              data={escritorios}
              renderItem={({item})=>{
                return <Itens 
                  getescritorios={getEscritorios}
                  nome={item.nome}    
                  cnpj={item.cnpj}  
                  telefone1={item.telefone1}   
                  gestor={item.gestor}                            
                  id={item.id} 
                  
                  />
            }}
            />
            <TouchableOpacity  
                onPress={()=> navigation.navigate('Cadastrar Escritorio')} 
                style={styles.btncadastrar}
            >
              <MaterialCommunityIcons size={50} name="plus" color = {'white'} style={styles.cadastrar}  />
            </TouchableOpacity> 

        </View>        
    </SafeAreaView>
  );
}