import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../../environments/';

export default function Itens(props) {
    const navigation = useNavigation(); 

    async function deleteesc(id, nome){
        Alert.alert(
            "Excluir Usuário",
            "Tem certeza que deseja excluir o cliente "+nome+"?",           
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
            onPress={()=> navigation.navigate('Visualizar Cliente',
                {
                    id: props.id,
                })
            } 
            style={styles.mainContent}
        >
            
                <View style={styles.titleContent}>
                    <Text style={styles.info2}>{props.nome}</Text>
                    <Menu style={styles.btndel}>
                        <MenuTrigger >
                            <MaterialCommunityIcons size={25}  color = {'#611215'} name="dots-vertical"   />
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => navigation.navigate('Editar Cliente', { id: props.id, })} >
                                <Text style={{color: '#000000', fontSize: 20,}}>Editar</Text>
                            </MenuOption>
                            <MenuOption onSelect={() => {deleteesc(props.id, props.nome)}} >
                                <Text style={{color: '#611215', fontSize: 20,}}>Excluir</Text>
                            </MenuOption>                            
                        </MenuOptions>
                    </Menu> 

                </View>
                <View style={styles.infoContent}>

                    <View style={styles.contextLeft}>
                        <View style={styles.boxInfo}>
                            <Text style={styles.info1}>
                                CPF: {props.cpf}                                
                            </Text>
                            <Text style={styles.info1}>                                
                                Mãe: {props.mae}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.contextRight}>                        
                            <Text style={styles.info3}>Tel.: {props.telefone1}</Text>
                       
                            

                    </View>
                </View>
            
            </Pressable>
    );
}