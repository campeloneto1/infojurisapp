import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../../environments/';

export default function Itens(props) {
    const navigation = useNavigation(); 

    async function deleteusu(id, nome){
        Alert.alert(
            "Excluir Usuário",
            "Tem certeza que deseja excluir o usuário "+nome+"?",           
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
    
        fetch(env.default.url+'usuarios/'+id,{
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
            props.getusuarios();
            
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
            onPress={()=> navigation.navigate('Editar Usuario',
                {
                    id: props.id,
                })
            } 
            style={styles.mainContent}
        >
            
                <View style={styles.titleContent}>
                    <Text style={styles.info2}>{props.nome}</Text>

                </View>
                <View style={styles.infoContent}>

                    <View style={styles.contextLeft}>
                        <View style={styles.boxInfo}>
                            <Text style={styles.info1}>
                                CPF: {props.cpf}                                
                            </Text>
                            <Text style={styles.info1}>                                
                                Tel.: {props.telefone1}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.contextRight}>                        
                            <Text style={styles.info3}></Text>
                       
                            <Pressable style={styles.btndel} onPress={()=> {deleteusu(props.id, props.nome)}} >
                                <MaterialCommunityIcons size={20}  color = {'#611215'} name="delete"   />
                            </Pressable>

                    </View>
                </View>
            
            </Pressable>
    );
}