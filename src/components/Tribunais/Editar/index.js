import React, {useState} from 'react';
import { Text, View, SafeAreaView, Pressable,TextInput, TouchableOpacity, Keyboard, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import MaskInput from 'react-native-mask-input';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../../environments/';
import Toast from 'react-native-toast-message';
import styles from './styles';
const cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '-', /\d/, /\d/];
const cellMask = ['(',/\d/, /\d/,') ', /\d/, ' ', /\d/, /\d/, /\d/,/\d/,'-', /\d/, /\d/, /\d/, /\d/];

export default function EditarTribunal({route}) {
  const navigation = useNavigation(); 
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [usuario, setUsuario] = useState('');
  
  useFocusEffect(
    React.useCallback(() => {
      getUsuario();
      clear();   
      
    }, [])
  );

  function clear(){
    setName(null);
    setCpf(null);
    setTelefone(null);
    setEmail(null);
      
  }

  async function getUsuario(){
    //console.log(cell);

    let result = await  SecureStore.getItemAsync('token');    
    
    fetch(env.default.url+'usuarios/'+route.params?.id,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+result
      }
    }).then((response) => response.json())
    .then((json) => {                
      if(json){        
        //console.log(json);
        setName(json.nome);
        setUsuario(json.id);
        setCpf(json.cpf);
        setTelefone(json.telefone1);
        setEmail(json.email);
      }else{
        //console.log(json);
      }     
    })
    .catch((error) => {
      
    });    
  }


  async function cadastrar(){
    let escri = await  SecureStore.getItemAsync('escritorio');   
    //console.log(checkbox);
    let result = await  SecureStore.getItemAsync('token');    
    
      fetch(env.default.url+'usuarios',{
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+result
        },
        body: JSON.stringify({
          nome: name,
          cpf: cpf,
          telefone1: telefone,
          email: email,
          id: usuario,
        })
      }).then((response) => response.json())
      .then((json) => {     
        //console.log(json);
        if(json){
          //console.log(json);
          if(json == 1){
            Toast.show({
              type: 'success',
              text1: 'Edição realizada',
              text2: 'Usuário editado com sucesso.',
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
/* 
 <View style={styles.containerNome}>
            <Text style={styles.nome}>Editar Cliente</Text>
          </View>
*/
  return (
    <SafeAreaView style={styles.container} onPress={Keyboard.dismiss}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>Editar Usuário</Text> 
        </View> 
        <TouchableOpacity  
                onPress={()=> navigation.navigate('Usuarios')} 
                style={styles.voltar}
            >
              <MaterialCommunityIcons size={35} name="arrow-left" color = {'white'}   />
            </TouchableOpacity> 
        <Pressable onPress={Keyboard.dismiss} style={styles.containerBody}>
         
        <ScrollView style={styles.containerScrow}>
            <View style={styles.containerForms}> 

              <TextInput 
                style={styles.input} 
                value={name}
                placeholder="Nome" 
                keyboardType="default"
                onChangeText={text => setName(text)}
              />   
      
              <MaskInput 
                style={styles.input} 
                mask={cpfmask} 
                value={cpf}
                keyboardType="numeric"                
                onChangeText={(masked, unmasked, obfuscated) => {
                  setCpf(unmasked); // you can use the masked value as well
                }}
                />    

            
              <MaskInput 
                style={styles.input} 
                mask={cellMask} 
                value={telefone}
                keyboardType="numeric"                
                onChangeText={(masked, unmasked, obfuscated) => {
                  setTelefone(unmasked); // you can use the masked value as well
                }}
                />

                <TextInput 
                style={styles.input} 
                value={email}
                placeholder="E-mail" 
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                />   
      

                <TouchableOpacity 
                      disabled={!name || !cpf || !telefone || !email}
                      style={styles.button}     
                      onPress={()=> cadastrar()}   
                      >
                      <Text style={styles.textButton}>
                          Editar
                      </Text>
                </TouchableOpacity>

            </View>
            
            
          </ScrollView>
        </Pressable>
        
    </SafeAreaView>
  );
}