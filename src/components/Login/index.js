import React, {useState} from 'react';
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, Pressable, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as env from '../../environments/';
import * as SecureStore from 'expo-secure-store';

import styles from './styles';


export default function Login(props) {
  const navigation = useNavigation(); 
  const [usuario, setUsuario] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
 
  async function login(){
    navigation.navigate('Inicio');
  }

  return (
    <SafeAreaView style={styles.container}>   
      <View  style={styles.container2}>

        <View style={styles.containerLogo}>
            
            <Text style={styles.title}>InfoJuris</Text> 
        </View>
        <Pressable  style={styles.containerForm}  onPress={Keyboard.dismiss}>
                      
            <TextInput 
              style={styles.input} 
              placeholder="CPF" 
              keyboardType="number-pad"
              onChangeText={setUsuario} 
              value={usuario} 
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


  