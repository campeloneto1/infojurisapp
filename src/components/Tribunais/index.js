import React, {useState} from 'react';
import { Text, View, SafeAreaView,FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../environments/';
import { useNavigation } from '@react-navigation/native';
import Itens from './Itens/';
import styles from './styles';

export default function Tribunais() {
  const navigation = useNavigation(); 
  const [tribunais, setTribunais] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getTribunais();
      
    }, [])
  );

  async function getTribunais(){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'tribunais',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+result
      }
    }).then((response) => response.json())
    .then((json) => {                   
      if(json){
        setTribunais(json);        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });

    
  }

  return (
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>Tribunais</Text> 
            <Pressable style={styles.voltar} onPress={() => {navigation.navigate('Menu')}}>
              <MaterialCommunityIcons size={35} name="arrow-left" color = {'white'}   />
            </Pressable> 
        </View> 
        <View style={styles.containerBody}>
       
          <FlatList style={styles.list}
              data={tribunais}
              renderItem={({item})=>{
                return <Itens 
                  gettribunais={getTribunais}
                  nome={item.nome}    
                  telefone1={item.telefon1}  
                  email={item.email}                      
                  id={item.id} 
                  
                  />
            }}
            />
            <TouchableOpacity  
                onPress={()=> navigation.navigate('Cadastrar Tribunal')} 
                style={styles.btncadastrar}
            >
              <MaterialCommunityIcons size={50} name="plus" color = {'white'} style={styles.cadastrar}  />
            </TouchableOpacity> 

        </View>        
    </SafeAreaView>
  );
}