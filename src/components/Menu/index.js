import React from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Pressable } from 'react-native';
import styles from './styles';

export default function Menu() {
  return (
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerBody}>
          <Text style={styles.title}>Menu</Text> 

          <View style={styles.containerMenus}>
        
              <TouchableOpacity style={styles.menu}>
                <Text style={styles.textmenu}>Clientes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menu}>
                <Text style={styles.textmenu}>Escritórios</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menu}>
                <Text style={styles.textmenu}>Processos</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.menu}>
                <Text style={styles.textmenu}>Usuários</Text>
              </TouchableOpacity>

          </View>
       
        </View>
        
    </SafeAreaView>
  );
}