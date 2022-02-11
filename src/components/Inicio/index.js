import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles';

export default function Inicio() {
  return (
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>InfoJuris </Text> 
        </View> 
        <View style={styles.containerBody}>
       
        </View>
        
    </SafeAreaView>
  );
}