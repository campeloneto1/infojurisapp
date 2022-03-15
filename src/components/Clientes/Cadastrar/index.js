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

const estadoscivis = [
  { label: 'Solteiro(a)', value: '1' },
  { label: 'Casado(a)', value: '2' },
  { label: 'Divorciado(a)', value: '3' },
  { label: 'Viuvo(a)', value: '4' },
  { label: 'União Estável', value: '5' },
];

const cnpjmask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/,/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '-', /\d/, /\d/,'*'];
const cellMask = ['(',/\d/, /\d/,') ', /\d/, ' ', /\d/, /\d/, /\d/,/\d/,'-', /\d/, /\d/, /\d/, /\d/,'*'];
const dtMask = [ /\d/, /\d/,'/', /\d/,/\d/,'/', /\d/, /\d/, /\d/, /\d/,'*'];

export default function CadastrarCliente() {
  const navigation = useNavigation(); 

  const [ocupacoes, setOcupacoes] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const [paises, setPaises] = useState([]);

  const [name, setName] = useState();
  const [cpf, setCpf] = useState();
  const [telefone, setTelefone] = useState();
  const [email, setEmail] = useState();
  const [dtnasc, setDtnasc] = useState();
  const [mae, setMae] = useState();
  const [pai, setPai] = useState();
  const [ocupacao, setOcupacao] = useState();
  const [estadocivil, setEstadocivil] = useState();

  const [rua, setRua] = useState();
  const [numero, setNumero] = useState();
  const [complemento, setComplemento] = useState();
  const [bairro, setBairro] = useState();
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();
  const [pais, setPais] = useState();

  
  useFocusEffect(
    React.useCallback(() => {
      getOcupacoes();
      getPaises();
      getEstados(1);
      clear();   
      
    }, [])
  );

  function clear(){
    setName(null);
    setCpf(null);
    setTelefone(null);
    setEmail(null);
    setDtnasc(null); 
    setMae(null); 
    setPai(null); 
    setOcupacao(null); 
    setEstadocivil(null); 

    setRua(null); 
    setNumero(null); 
    setComplemento(null); 
    setBairro(null); 
    setCidade(null); 
    setEstado(null); 
    setPais(null); 
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

  async function getPaises(){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'paises',{
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
        setPaises(json);        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });
  }

  async function getEstados(id){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'estados/'+id+'/where',{
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
        setEstados(json);        
      }else{
        
      }     
    })
    .catch((error) => {
      
    });
  }

  async function getCidades(id){
    let result = await  SecureStore.getItemAsync('token');    

    fetch(env.default.url+'cidades/'+id+'/where',{
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
        setCidades(json);        
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
          nome: name,
          cpf: cpf,
          telefone1: telefone,
          data_nascimento: dtnasc.substr(4,4)+'-'+dtnasc.substr(2,2)+'-'+dtnasc.substr(0,2),
          email: email,
          mae: mae,
          pai: pai,
          ocupacao_id: ocupacao,
          estado_civil: estadocivil,
          escritorio_id: esc,

          rua: rua,
          numero: numero,
          complemento: complemento,
          bairro: bairro,
          cidade_id: cidade,
          estado_id: estado,
          pais_id: pais,
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
                    labelField="label"
                    valueField="value"                    
                    placeholder="Estado Civil"
                    onChange={item => {
                      setEstadocivil(item.value);
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

                <TextInput 
                style={styles.input} 
                value={rua}
                placeholder="Rua" 
                keyboardType="default"
                onChangeText={text => setRua(text)}
                />

                <TextInput 
                style={styles.input} 
                value={numero}
                placeholder="Número" 
                keyboardType="default"
                onChangeText={text => setNumero(text)}
                />

              <TextInput 
                style={styles.input} 
                value={complemento}
                placeholder="Complemento" 
                keyboardType="default"
                onChangeText={text => setComplemento(text)}
                />

                <TextInput 
                style={styles.input} 
                value={bairro}
                placeholder="Bairro" 
                keyboardType="default"
                onChangeText={text => setBairro(text)}
                />

                {Object.keys(paises).length > 0  &&                         
                  <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={paises}
                    value={pais}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"                    
                    placeholder="País"
                    onChange={item => {
                      setPais(item.id);
                      getEstados(item.id);
                     }}
                    
                    textError="Error"
                />
                }    

                {Object.keys(estados).length > 0  &&                         
                  <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={estados}
                    value={estado}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"                    
                    placeholder="Estado"
                    onChange={item => {
                      setEstado(item.id);
                      getCidades(item.id);
                     }}
                    
                    textError="Error"
                />
                }      

                {Object.keys(cidades).length > 0  &&                         
                  <Dropdown
                    style={styles.input}
                    containerStyle={styles.input}
                    data={cidades}
                    value={cidade}
                    search
                    searchPlaceholder="Pesquisar..."
                    labelField="nome"
                    valueField="id"                    
                    placeholder="Cidade"
                    onChange={item => {
                      setCidade(item.id);
                     }}
                    
                    textError="Error"
                />
                }     
      
                <TouchableOpacity 
                      disabled={!name || !cpf || !telefone || !email || !dtnasc || !mae}
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