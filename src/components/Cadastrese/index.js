import React, {useState} from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, TextInput, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaskInput from 'react-native-mask-input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const maskCpf = [/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  const maskTelefone = ['(',/\d/,/\d/,')',' ',/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/];
  const maskCnpj = [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/];

export default function Cadastrese() {
  const navigation = useNavigation(); 

  const [nome, setNome] = useState(null);
  const [cpf, setCpf] = useState(null);
  const [telefone, setTelefone] = useState(null);
  const [email, setEmail] = useState(null);
  const [escritorio, setEscritorio] = useState(null);
  const [cnpj, setCnpj] = useState(null);

  async function cadastrese(){  
    
    fetch(env.default.url+'cadastrese',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+result
      },
      body: JSON.stringify({
        nome: nome,
        cpf: cpf,
        telefone1: telefone,
        email: email,
        escritorio: escritorio,
        cnpj: cnpj,
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
            text2: 'Usuário cadastrado com sucesso.',
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
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>Cadastre-se </Text> 
            <Pressable style={styles.voltar} onPress={() => {navigation.navigate('Login')}}>
              <MaterialCommunityIcons size={35} name="arrow-left" color = {'white'}   />
            </Pressable>            
        </View> 
        <View style={styles.containerBody}>
          <ScrollView style={styles.containerScrow}>
            <View style={styles.containerForms}> 

              <TextInput 
                style={styles.input} 
                placeholder="Nome" 
                keyboardType="default"
                onChangeText={setNome} 
                value={nome} 
              />

              <MaskInput
                    keyboardType="number-pad"
                    style={styles.input} 
                    value={cpf}
                    mask={maskCpf}
                    showObfuscatedValue
                    obfuscationCharacter="#"
                    onChangeText={(masked, unmasked, obfuscated) => {
                      setCpf(unmasked); // you can use the masked value as well
                    }}
                  />

              <MaskInput
                     keyboardType="number-pad"
                    style={styles.input} 
                    value={telefone}
                    mask={maskTelefone}
                    showObfuscatedValue
                    obfuscationCharacter="#"
                    onChangeText={(masked, unmasked, obfuscated) => {
                      setTelefone(unmasked); // you can use the masked value as well
                    }}
                  />              

              <TextInput 
                style={styles.input} 
                placeholder="E-mail" 
                keyboardType="email-address"
                onChangeText={setEmail} 
                value={email} 
              />

              <TextInput 
                style={styles.input} 
                placeholder="Escritório" 
                keyboardType="default"
                onChangeText={setEscritorio} 
                value={escritorio} 
              />

              <MaskInput
                     keyboardType="number-pad"
                    style={styles.input} 
                    value={cnpj}
                    mask={maskCnpj}
                    showObfuscatedValue
                    obfuscationCharacter="#"
                    onChangeText={(masked, unmasked, obfuscated) => {
                      setCnpj(unmasked); // you can use the masked value as well
                    }}
                  /> 

              <TouchableOpacity 
                    disabled={!nome && !cpf && !telefone && !email && !escritorio && !cnpj}
                    style={styles.button}     
                    onPress={()=> cadastrese()}           
                    >
                    <Text style={styles.textButton}>
                        Cadastrar
                    </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </View> 
    </SafeAreaView>
  );
}