import React, {useState} from 'react';
import { Text, View, SafeAreaView,FlatList, TouchableOpacity, Pressable, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../environments/';
import { useNavigation } from '@react-navigation/native';
import Itens from './Itens/';
import styles from './styles';

export default function Audiencias() {
  const navigation = useNavigation(); 
  const [audicencias, setAudiencias] = useState([]);
  const [filteredData, setFilteredData] = useState([]); 
  const [search, setSearch] = useState();

  useFocusEffect(
    React.useCallback(() => {
      getAudiencias();
      
    }, [])
  );

  async function getAudiencias(){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'audiencias',{
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
        setAudiencias(json);    
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
            const itemData2 = item.processo.autor.nome.toUpperCase();
            const textData = text.toUpperCase();
            return item.processo.codigo.indexOf(text) > -1 || itemData2.indexOf(textData) > -1;
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
            <Text style={styles.title}>Audiências</Text> 
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
                  getaudiencias={getAudiencias}
                  autor={item.processo?.autor.nome}                          
                  codigo={item.processo?.codigo}  
                  natureza={item.processo?.natureza.nome}
                  vara={item.processo?.vara?.nome}
                  data={item.data}
                  hora={item.hora}
                  tipo={item.tipo_id}
                  link={item.link}
                  status={item.status}
                  id={item.id} 
                  
                  />
            }}
            />
            <TouchableOpacity  
                onPress={()=> navigation.navigate('Cadastrar Audiencia')} 
                style={styles.btncadastrar}
            >
              <MaterialCommunityIcons size={50} name="plus" color = {'white'} style={styles.cadastrar}  />
            </TouchableOpacity> 

        </View>        
    </SafeAreaView>
  );
}