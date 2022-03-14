import React from "react";
import { View, Text, Linking  } from "react-native";
import styles from "./styles";
import { useNavigation } from '@react-navigation/native';

import Moment from 'moment';

export default function Itens(props) {
    const navigation = useNavigation(); 

    return (
        <View style={styles.mainContent} >
            <View style={styles.contextLeft}>
                <Text style={styles.info1}>{Moment(props.data).format('DD/MM/YYYY')} {props.hora}</Text>  
            </View>
            <View style={styles.contextRight}>
                {props.tipo == 1 && (
                    <Text style={styles.info2}>Presencial</Text>
                )}
                {props.tipo == 2 && (
                    <Text 
                    style={styles.info3}
                    onPress={() => { 
                        Linking.openURL(props.link); 
                    }}> 
                        On line
                    </Text>
                )}                
            </View>
        </View>
    );
}