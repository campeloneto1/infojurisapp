import React, {useState} from 'react';
import { Text, View, SafeAreaView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import * as env from '../../environments/';
import Moment from 'moment';
import styles from './styles';

const cnpjmask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/,/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];
const cpfmask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.',/\d/, /\d/, /\d/, '-', /\d/, /\d/];
const cellMask = ['(',/\d/, /\d/,') ', /\d/, ' ', /\d/, /\d/, /\d/,/\d/,'-', /\d/, /\d/, /\d/, /\d/];
const dtMask = [ /\d/, /\d/,'/', /\d/,/\d/,'/', /\d/, /\d/, /\d/, /\d/];
const moneyMask = createNumberMask({
  prefix: ['R', '$', ' '],
  delimiter: ' ',
  separator: '.',
  precision: 2,
})

export default function Processo({route}) {

  const navigation = useNavigation(); 

  const [processo, setProcesso] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getProcesso();     
    }, [])
  );

  async function getProcesso(){
    //console.log(cell);

    let result = await  SecureStore.getItemAsync('token');    
    
    fetch(env.default.url+'processos/'+route.params?.id,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+result
      }
    }).then((response) => response.json())
    .then((json) => {                
      if(json){        

        setProcesso(json);
        
      }else{
        //console.log(json);
      }     
    })
    .catch((error) => {
      
    });    
  }

  return (
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>{processo?.codigo}</Text> 
            <Pressable style={styles.voltar} onPress={() => {navigation.navigate('Processos')}}>
              <MaterialCommunityIcons size={35} name="arrow-left" color = {'white'}   />
            </Pressable> 
        </View> 
        <View style={styles.containerBody}>
          <View style={styles.containerText}>

          <View style={styles.containerText2}>    
            {processo.status == 1 && (
              <Text  style={styles.label2}>Em andamento</Text>
            )}
          </View>

          <View style={styles.containerText2}>            

            <View style={styles.containerText4}>
              <Text style={styles.label}>Valor</Text>
              <Text style={styles.textlabel}>R$ {processo.valor}</Text>
            </View>

            <View style={styles.containerText4}>
              <Text style={styles.label}>Natureza</Text>
              <Text style={styles.textlabel}>{processo.natureza?.nome}</Text>
            </View>

            <View style={styles.containerText4}>
              <Text style={styles.label}>Data</Text>
              <Text style={styles.textlabel}>{Moment(processo.data).format('DD/MM/YYYY')}</Text>
            </View>

          </View>

            
          <View style={styles.containerText5}>  
          
            <Text style={styles.label}>Vara</Text>
            <Text style={styles.textlabel}>{processo.vara?.nome} / {processo.vara?.comarca.nome} / {processo.vara?.comarca.tribunal.nome}</Text>

          </View>

          <View style={styles.containerText6}>

            <View style={styles.containerText3}>
              <Text style={styles.label}>Autor</Text>
              <Text style={styles.textlabel}>{processo.autor?.nome}</Text>
              <Text style={styles.textlabel}>{processo.autor?.cpf}</Text>
              <Text style={styles.textlabel}>{processo.autor?.telefone1}</Text>
            </View>

            <View style={styles.containerText31}>
              <Text style={styles.label}>Réu</Text>
              <Text style={styles.textlabel}>{processo.reu?.nome}</Text>
              <Text style={styles.textlabel}>{processo.reu?.cpf}</Text>
              <Text style={styles.textlabel}>{processo.reu?.telefone1}</Text>
            </View>

          </View>

          </View>        
        </View>
        
    </SafeAreaView>
  );
}