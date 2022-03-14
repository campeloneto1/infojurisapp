import React, {useState} from 'react';
import { Text, View, SafeAreaView, Pressable,TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import MaskInput from 'react-native-mask-input';
import { Dropdown } from 'react-native-element-dropdown';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../../environments/';
import Toast from 'react-native-toast-message';
import styles from './styles';

const cnpjmask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/,/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '-', /\d/, /\d/];
const cellMask = ['(',/\d/, /\d/,') ', /\d/, ' ', /\d/, /\d/, /\d/,/\d/,'-', /\d/, /\d/, /\d/, /\d/];
const dtMask = [ /\d/, /\d/,'/', /\d/,/\d/,'/', /\d/, /\d/, /\d/, /\d/];
const hrMask = [ /\d/, /\d/,':', /\d/,/\d/];
const tipos = [
  { nome: 'Presencial', id: '1' },
  { nome: 'Online', id: '2' },
];

export default function CadastrarAudiencia() {
  const navigation = useNavigation(); 

  const [processos, setProcessos] = useState([]);

  const [processo, setProcesso] = useState(null);
  const [data, setData] = useState(null);
  const [hora, setHora] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [link, setLink] = useState(null);
  const [obs, setObs] = useState(null);


  
  useFocusEffect(
    React.useCallback(() => {
      clear();   
      getProcessos();
    }, [])
  );

  function clear(){
    setProcesso(null);
    setData(null);
    setHora(null);
    setTipo(null);
    setLink(null);
  }

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

  async function cadastrar(){  
        
    let esc = await  SecureStore.getItemAsync('escritorio');   
    let result = await  SecureStore.getItemAsync('token');    
    
      fetch(env.default.url+'audiencias',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+result
        },
        body: JSON.stringify({
          processo_id: processo,
          data: data.substr(4,4)+'-'+data.substr(2,2)+'-'+data.substr(0,2),
          hora: hora+'00',
          tipo_id: tipo,
          link: link,
          obs: obs,
         
        })
      }).then((response) => response.json())
      .then((json) => {     
        console.log(json);
        if(json){
          //console.log(json);
          if(json == 1){
            Toast.show({
              type: 'success',
              text1: 'Cadastro realizado',
              text2: 'Audiência cadastrada com sucesso.',
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
            <Text style={styles.title}>Cadastrar Audiência</Text> 
        </View> 
        <TouchableOpacity  
                onPress={()=> navigation.navigate('Audiencias')} 
                style={styles.voltar}
            >
              <MaterialCommunityIcons size={35} name="arrow-left" color = {'white'}   />
            </TouchableOpacity> 
        <Pressable onPress={Keyboard.dismiss} style={styles.containerBody}>
         
        <ScrollView style={styles.containerScrow}>
            <View style={styles.containerForms}> 

                {Object.keys(processos).length > 0  &&      
                <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={processos}
                    value={processo}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="codigo"
                    valueField="id"
                    
                    placeholder="Processo"
                    onChange={item => {
                      setProcesso(item.id);
                     }}
                    
                    textError="Error"
                />
                }

                
      
              <MaskInput 
                style={styles.input} 
                mask={dtMask} 
                value={data}
                keyboardType="numeric"                
                onChangeText={(masked, unmasked, obfuscated) => {                  
                  setData(unmasked); // you can use the masked value as well
                }}
                />    

                <MaskInput 
                style={styles.input} 
                mask={hrMask} 
                value={hora}
                keyboardType="numeric"                
                onChangeText={(masked, unmasked, obfuscated) => {                  
                  setHora(unmasked); // you can use the masked value as well
                }}
                />   


                <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={tipos}
                    value={tipo}                   
                    labelField="nome"
                    valueField="id"                    
                    placeholder="Tipo"
                    onChange={item => {
                      setTipo(item.id);
                     }}
                    
                    textError="Error"
                />
                 
              {tipo == 2  &&   
              <TextInput 
                style={styles.input} 
                value={link}
                placeholder="Link" 
                keyboardType="default"

                onChangeText={text => setLink(text)}
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
                      disabled={!processo || !data || !hora || !tipo }
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