import React, {useState} from 'react';
import { Text, View, SafeAreaView, Pressable,FlatList,Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import * as env from '../../environments/';
import Moment from 'moment';
import Itens from './Itens/';
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
  const [pessoa, setPessoa] = useState([]);
  const [modal, setModal] = useState(false);

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

  async function showPessoa(data){
    setModal(true);
    setPessoa(data);
    //console.log(pessoa);
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

            <View 
            style={styles.containerText6}
            >

              <Pressable 
                onPress={() => {showPessoa(processo.autor)}}
                style={styles.containerText3}
              >
                <Text style={styles.label}>Autor</Text>
                <Text style={styles.textlabel}>{processo.autor?.nome}</Text>
                <Text style={styles.textlabel}>{processo.autor?.cpf}</Text>
                <Text style={styles.textlabel}>{processo.autor?.telefone1}</Text>
              </Pressable>

              <Pressable 
                onPress={() => {showPessoa(processo.reu)}}
                style={styles.containerText31}
              >
                <Text style={styles.label}>Réu</Text>
                <Text style={styles.textlabel}>{processo.reu?.nome}</Text>
                <Text style={styles.textlabel}>{processo.reu?.cpf}</Text>
                <Text style={styles.textlabel}>{processo.reu?.telefone1}</Text>
              </Pressable>

            </View>
            <View style={styles.containerText5}>
              <Text style={styles.label}>Audiências</Text>
              <FlatList style={styles.list}
                data={processo.audiencias}
                renderItem={({item})=>{
                  return <Itens                   
                    data={item.data}
                    hora={item.hora}
                    tipo={item.tipo_id}
                    link={item.link}
                    status={item.status}
                    id={item.id} 
                    
                    />
              }}
              />

            </View>

          </View>        
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal}         
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.titleModal}>{pessoa.nome}</Text>

              <View style={styles.containerTextModal}>
                <View style={styles.containerText2Modal}>
                  <Text style={styles.labelModal}>CPF</Text>
                  <Text >{pessoa.cpf}</Text>
                </View>
                
                <View style={styles.containerText2Modal}>
                  <Text style={styles.labelModal}>Data Nascimento</Text>
                  <Text >{pessoa.data_nascimento}</Text>
                </View>
              </View>
              <View style={styles.containerTextModal}>                
                <View style={styles.containerText2Modal}>
                  <Text style={styles.labelModal}>Telefone</Text>
                  <Text >{pessoa.telefone1}</Text>
                </View>
                <View style={styles.containerText2Modal}>
                  <Text style={styles.labelModal}>E-mail</Text>
                  <Text >{pessoa.email}</Text>
                </View>
              </View>
              <View style={styles.containerTextModal}>                
                <View style={styles.containerText2Modal}>
                  <Text style={styles.labelModal}>Mãe</Text>
                  <Text >{pessoa.mae}</Text>
                </View>
                <View style={styles.containerText2Modal}>
                  <Text style={styles.labelModal}>Pai</Text>
                  <Text >{pessoa.pai}</Text>
                </View>
              </View>
              <View style={styles.containerTextModal}>                
                <View style={styles.containerText2Modal}>
                  <Text style={styles.labelModal}>Est. Civil</Text>
                  {pessoa.estado_civil == 1 && (
                    <Text >Solteiro(a)</Text>
                  )}
                  {pessoa.estado_civil == 2 && (
                    <Text >Casado(a)</Text>
                  )}
                  {pessoa.estado_civil == 3 && (
                    <Text >Divorciado(a)</Text>
                  )}
                  {pessoa.estado_civil == 4 && (
                    <Text >Viuvo(a)</Text>
                  )}
                  {pessoa.estado_civil == 5 && (
                    <Text >União Estável</Text>
                  )}
                </View>
                <View style={styles.containerText2Modal}>
                  <Text style={styles.labelModal}>Ocupação</Text>
                  <Text >{pessoa.ocupacao?.nome}</Text>
                </View>
              </View>

              {pessoa.rua && (
                <View style={styles.containerTextModal2}>
                  <View >
                    <Text style={styles.labelModal}>Endereço</Text>
                    <Text >{pessoa.rua}, {pessoa.numero}, {pessoa.complemento}, {pessoa.bairro}, {pessoa.cidade?.nome} - {pessoa.estado?.uf}</Text>
                  </View>
                </View>
              )}

              <Pressable
                
                onPress={() => setModal(!modal)}
              >
                <Text style={styles.modalClose}>Fechar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        
    </SafeAreaView>
  );
}