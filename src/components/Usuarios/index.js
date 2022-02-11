import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Usuários() {
  return (
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>Usuários</Text> 
        </View> 
        <View style={styles.containerBody}>
       
        </View>        
    </SafeAreaView>
  );
}