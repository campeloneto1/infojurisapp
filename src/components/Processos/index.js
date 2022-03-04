import React, {useState} from 'react';
import { Text, View, SafeAreaView,FlatList, TouchableOpacity, Pressable, TextInput } from 'react-native';
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
  const [filteredData, setFilteredData] = useState([]); 
  const [search, setSearch] = useState();

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
        setFilteredData(json);    
      }else{
        
      }     
    })
    .catch((error) => {
      
    });

    
  }

  async function filtrar(text){   
    if (text) {
      const newData = processos.filter(
        function (item) {
          if (item.codigo) {
            const itemData2 = item.autor.nome.toUpperCase();
            const textData = text.toUpperCase();
            return item.codigo.indexOf(text) > -1 || itemData2.indexOf(textData) > -1;
          }
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(processos);
      setSearch(text);
    }
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
          <View style={styles.containerSearch}>
              <TextInput 
                      style={styles.input} 
                      value={search}
                      placeholder="Pesquisar..." 
                      keyboardType="default"
                      onChangeText={text =>  filtrar(text) }
                    />
            </View>
            <FlatList style={styles.list}
              data={filteredData}
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