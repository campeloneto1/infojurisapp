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
import Moment from 'moment';

export default function Itens(props) {
    const navigation = useNavigation(); 

    async function deleteesc(id, codigo){
        Alert.alert(
            "Excluir Usuário",
            "Tem certeza que deseja excluir a audiência do processo "+codigo+"?",           
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
    
        fetch(env.default.url+'audiencias/'+id,{
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+result
          }
        }).then((response) => response.json())
        .then((json) => {             
          //console.log(json);  
          if(json == 1){
            props.getaudiencias();
          }else{
          }     
        })
        .catch((error) => {
          
        });
    
        
      }

    return (
        <Pressable  
            
            
            style={styles.mainContent}
        >
            
                <View style={styles.titleContent}>
                    <Text style={styles.info2}>{props.autor}</Text>
                    <Menu style={styles.btndel}>
                        <MenuTrigger >
                            <MaterialCommunityIcons size={25}  color = {'#611215'} name="dots-vertical"   />
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => navigation.navigate('Editar Audiencia', { id: props.id, })}>
                            <Text style={{color: '#000000', fontSize: 20,}}>Editar</Text>
                            </MenuOption>   
                            <MenuOption onSelect={() => {deleteesc(props.id, props.codigo)}} >
                                <Text style={{color: '#611215', fontSize: 20,}}>Excluir</Text>
                            </MenuOption>                            
                        </MenuOptions>
                    </Menu>                    
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
                        <Text style={styles.info3}>{Moment(props.data).format('DD/MM/YYYY')} {props.hora}</Text>                                         
                        {props.tipo == 1 && (
                            <Text style={styles.info3}>Presencial</Text>
                        )}
                        {props.tipo == 2 && (
                            <Text style={styles.info3}>On line</Text>
                        )}
                        
                        
                    </View>
                </View>
            
            </Pressable>
    );
}