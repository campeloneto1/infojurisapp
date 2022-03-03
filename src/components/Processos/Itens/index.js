import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../../environments/';
import Moment from 'moment';

export default function Itens(props) {
    const navigation = useNavigation(); 

    async function deleteesc(id, codigo){
        Alert.alert(
            "Excluir Usuário",
            "Tem certeza que deseja excluir o processo "+codigo+"?",           
            [
                {
                    text: "Cancelar",
                },
                { 
                    text: "Excluir", 
                    style: "confirmdel",
                    onPress: () => confirmdel(id)
                }
            ]
              
        )
    }

    async function confirmdel(id){
        let result = await  SecureStore.getItemAsync('token');    
    
        fetch(env.default.url+'clientes/'+id,{
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+result
          }
        }).then((response) => response.json())
        .then((json) => {             
          //console.log(json);  
          if(json){
            props.getclientes();
            
            //console.log(json);
          }else{
            //console.log(json);
          }     
        })
        .catch((error) => {
          
        });
    
        
      }

    return (
        <Pressable  
            onPress={()=> navigation.navigate('Editar Processo',
                {
                    id: props.id,
                })
            } 
            style={styles.mainContent}
        >
            
                <View style={styles.titleContent}>
                    <Text style={styles.info2}>{props.autor}</Text>

                </View>
                <View style={styles.infoContent}>

                    <View style={styles.contextLeft}>
                        <View style={styles.boxInfo}>
                            <Text style={styles.info1}>
                                Cod.: {props.codigo}                                
                            </Text>
                            <Text style={styles.info1}>                                
                                Nat.: {props.natureza}
                            </Text>
                            <Text style={styles.info1}>                                
                                Vara: {props.vara}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.contextRight}>       
                            <Text style={styles.info3}>{Moment(props.data).format('DD/MM/YYYY')}</Text>                 
                            <Text style={styles.info3}>R$ {props.valor}</Text>
                            {props.status == 1 && (
                            <Text style={styles.info3}>Em andamento</Text>
                            )}
                            <Pressable style={styles.btndel} onPress={()=> {deleteesc(props.id, props.codigo)}} >
                                <MaterialCommunityIcons size={20}  color = {'#611215'} name="delete"   />
                            </Pressable>
                            
                    </View>
                </View>
            
            </Pressable>
    );
}