import React, {useState} from 'react';
import { Text, View, SafeAreaView, Pressable,TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import { Dropdown } from 'react-native-element-dropdown';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../../environments/';
import Toast from 'react-native-toast-message';
import styles from './styles';

const cnpjmask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/,/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '-', /\d/, /\d/];
const cellMask = ['(',/\d/, /\d/,') ', /\d/, ' ', /\d/, /\d/, /\d/,/\d/,'-', /\d/, /\d/, /\d/, /\d/];
const dtMask = [ /\d/, /\d/,'/', /\d/,/\d/,'/', /\d/, /\d/, /\d/, /\d/];
const moneyMask = createNumberMask({
  prefix: ['R', '$', ' '],
  delimiter: '.',
  separator: ',',
  precision: 2,
})

export default function CadastrarProcesso() {
  const navigation = useNavigation(); 

  const [clientes, setClientes] = useState([]);
  const [naturezas, setNaturezas] = useState([]);
  const [tribunais, setTribunais] = useState([]);
  const [comarcas, setComarcas] = useState([]);
  const [varas, setVaras] = useState([]);

  const [codigo, setCodigo] = useState(null);

  const [autor, setAutor] = useState(null);
  const [reu, setReu] = useState(null);

  const [valor, setValor] = useState(null);
  const [natureza, setNatureza] = useState(null);

  const [tribunal, setTribunal] = useState(null);
  const [comarca, setComarca] = useState(null);
  const [vara, setVara] = useState(null);

  const [obs, setObs] = useState(null);


  
  useFocusEffect(
    React.useCallback(() => {
      clear();   
      getNaturezas();
      getTribunais();
      getClientes();
    }, [])
  );

  function clear(){
    setCodigo(null);
    setAutor(null);
    setReu(null);
    setValor(null);
    setNatureza(null);
    setTribunal(null);
    setComarca(null);
    setVara(null);
    setObs(null);
  }

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

  async function getNaturezas(){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'naturezas',{
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
        setNaturezas(json);        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });

    
  }

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
      //console.log(json)                
      if(json){
        setTribunais(json);    
        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });
  }

  async function getComarcas(id){
    
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'comarcas/'+id+'/where',{
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
        setComarcas(json);        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });
  }

  async function getVaras(id){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'varas/'+id+'/where',{
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
        setVaras(json);        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });
  }


  async function cadastrar(){  
    //console.log(checkbox);
    let esc = await  SecureStore.getItemAsync('escritorio');   
    let result = await  SecureStore.getItemAsync('token');    
    
      fetch(env.default.url+'clientes',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+result
        },
        body: JSON.stringify({
          codigo: codigo,
          autor: autor,
          reu: reu,
          valor: valor,
          natureza_id: natureza,
          vara_id: vara,
          obs: obs,
          escritorio_id: esc,
         
        })
      }).then((response) => response.json())
      .then((json) => {     
        //console.log(json);
        if(json){
          //console.log(json);
          if(json == 1){
            Toast.show({
              type: 'success',
              text1: 'Cadastro realizado',
              text2: 'Cliente cadastrado com sucesso.',
              autoHide: true,
              visibilityTime: 2000
            });
            clear();
          }
        }else{
          //console.log(json);
        }     
      })
      .catch((error) => {
        //console.error(error);
      });
  }
  
  return (
    <SafeAreaView style={styles.container} onPress={Keyboard.dismiss}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>Cadastrar Cliente</Text> 
        </View> 
        <TouchableOpacity  
                onPress={()=> navigation.navigate('Processos')} 
                style={styles.voltar}
            >
              <MaterialCommunityIcons size={35} name="arrow-left" color = {'white'}   />
            </TouchableOpacity> 
        <Pressable onPress={Keyboard.dismiss} style={styles.containerBody}>
         
        <ScrollView style={styles.containerScrow}>
            <View style={styles.containerForms}> 

              <TextInput 
                style={styles.input} 
                value={codigo}
                placeholder="Código" 
                keyboardType="number-pad"

                onChangeText={text => setCodigo(text)}
              />   

                {Object.keys(clientes).length > 0  &&      
                <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={clientes}
                    value={autor}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"
                    
                    placeholder="Autor"
                    onChange={item => {
                      setAutor(item.id);
                     }}
                    
                    textError="Error"
                />
                }

                {Object.keys(clientes).length > 0  &&      
                <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={clientes}
                    value={reu}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"
                    
                    placeholder="Réu"
                    onChange={item => {
                      setReu(item.id);
                     }}
                    
                    textError="Error"
                />
                }
      
              <MaskInput 
                style={styles.input} 
                mask={moneyMask} 
                value={valor}
                keyboardType="numeric"                
                onChangeText={(masked, unmasked, obfuscated) => {
                  setValor(unmasked); // you can use the masked value as well
                }}
                />    

                {Object.keys(naturezas).length > 0  &&      
                <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={naturezas}
                    value={natureza}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"
                    
                    placeholder="Natureza"
                    onChange={item => {
                      setNatureza(item.id);
                     }}
                    
                    textError="Error"
                />
                }

                {Object.keys(tribunais).length > 0  &&                         
                  <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={tribunais}
                    value={tribunal}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"                    
                    placeholder="Tribunal"
                    onChange={item => {
                      setTribunal(item.id);
                      getComarcas(item.id);
                     }}
                    
                    textError="Error"
                />
                }  

                {Object.keys(comarcas).length > 0  &&     
                    <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={comarcas}
                    value={comarca}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"                    
                    placeholder="Comarca"
                    onChange={item => {
                      setComarca(item.id);  
                      getVaras(item.id);               
                    }}                    
                    textError="Error"
                  />                
                }  

                {Object.keys(varas).length > 0  &&     
                    <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={varas}
                    value={vara}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"                    
                    placeholder="Vara"
                    onChange={item => {
                      setVara(item.id);                                       
                    }}                    
                    textError="Error"
                  />                
                }  

              <TextInput 
                style={styles.input} 
                value={obs}
                placeholder="Observações" 
                keyboardType="default"

                onChangeText={text => setObs(text)}
              /> 
                

                <TouchableOpacity 
                      disabled={!codigo && !autor && !reu && !valor && !natureza && !tribunais && !comarca && !vara}
                      style={styles.button}     
                      onPress={()=> cadastrar()}   
                      >
                      <Text style={styles.textButton}>
                          Cadastrar
                      </Text>
                </TouchableOpacity>

            </View>
            
            
          </ScrollView>
        </Pressable>
        
    </SafeAreaView>
  );
}