import React, {useState} from 'react';
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, Pressable, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as env from '../../environments/';
import * as SecureStore from 'expo-secure-store';
import MaskInput from 'react-native-mask-input';
import styles from './styles';
const cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/,'-', /\d/, /\d/];

export default function Login(props) {
  const navigation = useNavigation(); 
  const [usuario, setUsuario] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
 
  async function setToken(data, data2, data3){
    //console.log(data3);
    SecureStore.deleteItemAsync('token');
    SecureStore.deleteItemAsync('escritorio');
    SecureStore.deleteItemAsync('administrador');
    SecureStore.deleteItemAsync('gestor');
    SecureStore.deleteItemAsync('relatorios');
    await SecureStore.setItemAsync('token',data);
    await SecureStore.setItemAsync('escritorio',data2+``);
    await SecureStore.setItemAsync('administrador',data3.administrador+``);
    await SecureStore.setItemAsync('gestor',data3.gestor+``);
    await SecureStore.setItemAsync('relatorios',data3.relatorios+``);
  }

  async function login(){    
    if(usuario && password){
      fetch(env.default.url+'login',{
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: usuario,
          password: password
        })
      }).then((response) => response.json())
      .then((json) => {     
        //console.log(json);
        if(json.token){
          setError(false);
          
          setToken(json.token, json.escritorio, json.user.perfil).then(
            () => {
              navigation.navigate('Inicio');
            }
          )        
          //console.log(json);        
        }else{
          //console.log(json);
          setError(true);
        }     
      })
      .catch((error) => {
        //console.error(error);
      }); 
    }
    
  }

  return (
    <SafeAreaView style={styles.container}>   
      <View  style={styles.container2}>

        <View style={styles.containerLogo}>
            
            <Text style={styles.title}>InfoJuris</Text> 
        </View>
        <Pressable  style={styles.containerForm}  onPress={Keyboard.dismiss}>
                      
        <MaskInput 
                  style={styles.input} 
                  
                  mask={cpfmask} 
                  value={usuario}
                  keyboardType="number-pad"                
                  onChangeText={(masked, unmasked, obfuscated) => {
                    setUsuario(unmasked); // you can use the masked value as well
                  }}
                  />        
            
            
            <TextInput 
              style={styles.input} 
              placeholder="Senha" 
              keyboardType="default"
              secureTextEntry={true}
              onChangeText={setPassword} 
              value={password} 
            />
            {
              error && ( 
                <Text style={styles.erroLogin}>Usuário ou senha incorreto</Text>
              
                  )
            }
          
            <TouchableOpacity 
                    disabled={!usuario && !password}
                    style={styles.button}     
                    onPress={()=> login()}           
                    >
                    <Text style={styles.textButton}>
                        Entrar
                    </Text>
              </TouchableOpacity>

              <Pressable 
                onPress={() => {navigation.navigate('Cadastre-se');}}
              >
                <Text style={styles.textForm}>Cadastre-se</Text>
              </Pressable>
          
        </Pressable>

      </View>
      

    </SafeAreaView>
  );
}


  