import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

import Moment from 'moment';

export default function Itens(props) {
    const navigation = useNavigation(); 

    return (
        <Pressable  
            onPress={()=> navigation.navigate('Processo',
                {
                    id: props.processo,
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