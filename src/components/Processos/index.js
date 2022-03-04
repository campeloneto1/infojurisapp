import React, {useState} from 'react';
import { Text, View, SafeAreaView,FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../environments/';
import { useNavigation } from '@react-navigation/native';
import Itens from './Itens/';
import styles from './styles';

export default function Processos() {
  const navigation = useNavigation(); 
  const [processos, setProcessos] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getProcessos();
      
    }, [])
  );

  async function getProcessos(){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'processos',{
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
        setProcessos(json);        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });

    
  }

  return (
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>Processos</Text> 
            <Pressable style={styles.voltar} onPress={() => {navigation.navigate('Menu')}}>
              <MaterialCommunityIcons size={35} name="arrow-left" color = {'white'}   />
            </Pressable> 
        </View> 
        <View style={styles.containerBody}>
       
          <FlatList style={styles.list}
              data={processos}
              renderItem={({item})=>{
                return <Itens 
                  getprocessos={getProcessos}
                  autor={item.autor?.nome}    
                  reu={item.reu?.nome}    
                  codigo={item.codigo}  
                  valor={item.valor}   
                  natureza={item.natureza?.nome}
                  vara={item.vara?.nome}
                  data={item.data}
                  status={item.status}
                  id={item.id} 
                  
                  />
            }}
            />
            <TouchableOpacity  
                onPress={()=> navigation.navigate('Cadastrar Processo')} 
                style={styles.btncadastrar}
            >
              <MaterialCommunityIcons size={50} name="plus" color = {'white'} style={styles.cadastrar}  />
            </TouchableOpacity> 

        </View>        
    </SafeAreaView>
  );
}