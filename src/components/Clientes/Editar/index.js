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
const cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '-', /\d/, /\d/,'*'];
const cellMask = ['(',/\d/, /\d/,') ', /\d/, ' ', /\d/, /\d/, /\d/,/\d/,'-', /\d/, /\d/, /\d/, /\d/,'*'];
const dtMask = [ /\d/, /\d/,'/', /\d/,/\d/,'/', /\d/, /\d/, /\d/, /\d/,'*'];

const estadoscivis = [
  { nome: 'Solteiro', id: '1' },
  { nome: 'Casado', id: '2' },
  { nome: 'Divorciado', id: '3' },
  { nome: 'Viuvo', id: '4' },
  { nome: 'União Estável', id: '5' },
];

export default function EditarEscritorio({route}) {
  const navigation = useNavigation(); 

  const [ocupacoes, setOcupacoes] = useState([]);

  const [cliente, setCliente] = useState();

  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [telefone, setTelefone] = useState();
  const [email, setEmail] = useState();
  const [dtnasc, setDtnasc] = useState();
  const [mae, setMae] = useState();
  const [pai, setPai] = useState();
  const [ocupacao, setOcupacao] = useState();
  const [estadocivil, setEstadocivil] = useState();
  
  useFocusEffect(
    React.useCallback(() => {
      getCliente();
      getOcupacoes();
      clear();   
      
    }, [])
  );

  function clear(){
    setName(null);
    setCpf(null);
    setTelefone(null);
    setEmail(null);
    setMae(null); 
    setDtnasc(null); 
    setPai(null); 
    setOcupacao(null); 
    setEstadocivil(null); 
      
  }

  async function getCliente(){
    //console.log(cell);

    let result = await  SecureStore.getItemAsync('token');    
    
    fetch(env.default.url+'clientes/'+route.params?.id,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+result
      }
    }).then((response) => response.json())
    .then((json) => {                
      if(json){        
        //console.log(json.estado_civil);
        setName(json.nome);
        setCliente(json.id);
        setCpf(json.cpf);
        setTelefone(json.telefone1);
        setEmail(json.email);
        setDtnasc(json.data_nascimento.substr(8,2)+json.data_nascimento.substr(5,2)+json.data_nascimento.substr(0,4));
        setMae(json.mae);
        setPai(json.pai);
        setEstadocivil(json.estado_civil);
        setOcupacao(json.ocupacao_id);
      }else{
        //console.log(json);
      }     
    })
    .catch((error) => {
      
    });    
  }

  async function getOcupacoes(){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'ocupacoes',{
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
        setOcupacoes(json);        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });
  }

  async function cadastrar(){

    let result = await  SecureStore.getItemAsync('token');    
    
      fetch(env.default.url+'clientes',{
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
          data_nascimento: dtnasc.substr(4,4)+'-'+dtnasc.substr(2,2)+'-'+dtnasc.substr(0,2),
          mae: mae,
          pai: pai,
          estado_civil: estadocivil,
          ocupacao_id: ocupacao,
          id: cliente,
        })
      }).then((response) => response.json())
      .then((json) => {     
        //console.log(json);
        if(json){
          console.log(json);
          if(json == 1){
            Toast.show({
              type: 'success',
              text1: 'Edição realizada',
              text2: 'Cliente editado com sucesso.',
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
            <Text style={styles.title}>Editar Cliente</Text> 
        </View> 
        <TouchableOpacity  
                onPress={()=> navigation.navigate('Clientes')} 
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
                placeholder="Nome*" 
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
                placeholder="E-mail*" 
                keyboardType="email-address"
                onChangeText={text => setEmail(text)}
                /> 

                <MaskInput 
                style={styles.input} 
                mask={dtMask} 
                value={dtnasc}                
                keyboardType="numeric"                
                onChangeText={(masked, unmasked, obfuscated) => {
                  setDtnasc(unmasked); // you can use the masked value as well
                }}
                /> 

                <TextInput 
                style={styles.input} 
                value={mae}
                placeholder="Mãe*" 
                keyboardType="default"
                onChangeText={text => setMae(text)}
                />  

                <TextInput 
                style={styles.input} 
                value={pai}
                placeholder="Pai" 
                keyboardType="default"
                onChangeText={text => setPai(text)}
                /> 

                <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={estadoscivis}
                    value={estadocivil}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"                  
                    placeholder="Estado Civil"
                    onChange={item => {
                      setEstadocivil(item.id);
                     }}
                    
                    textError="Error"
                />

                {Object.keys(ocupacoes).length > 0  &&                         
                  <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={ocupacoes}
                    value={ocupacao}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"                    
                    placeholder="Ocupação"
                    onChange={item => {
                      setOcupacao(item.id);
                     }}
                    
                    textError="Error"
                />
                } 
      
                <TouchableOpacity 
                      disabled={!name || !cpf || !telefone || !email || !dtnasc || !mae }
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