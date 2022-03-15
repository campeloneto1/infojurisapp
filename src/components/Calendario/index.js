import React, {useState} from 'react';
import { Text, View, SafeAreaView, FlatList } from 'react-native';
import {Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import { useFocusEffect } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import * as env from '../../environments/';
import Itens from './Itens/';
import styles from './styles';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
  dayNamesShort: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt-br';

export default function Calendario() {
  const [audiencias, setAudiencias] = useState([]);
  const [datas, setDatas] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      getDatas();  
      clear();
    }, [])
  );

  async function clear(){
    setAudiencias([]);
    setDatas([]);
  }
  

  async function getDatas(){
    const d = new Date();
    let month = d.getMonth()+1;
    let year = d.getFullYear();
    let result = await  SecureStore.getItemAsync('token');    
    
    fetch(env.default.url+'audiencias/'+month+'/'+year+'/calendario',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+result
      }
    }).then((response) => response.json())
    .then((json) => {              
      if(json){        
        //console.log(json.estado_civil);
        var dts = {};
      
        json.forEach(element => {
          dts[element.data] = {'marked': true};
        });
        //console.log(dts);
        setDatas(dts);    
      }else{
        
      }     
    })
    .catch((error) => {
      
    });    
  }

  async function changeMonth(month, year){    
    //setAudiencias([]);
    let result = await  SecureStore.getItemAsync('token');    
    
    fetch(env.default.url+'audiencias/'+month+'/'+year+'/calendario',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+result
      }
    }).then((response) => response.json())
    .then((json) => {              
      if(json){        
        //console.log(json.estado_civil);
        var dts = {};
      
        json.forEach(element => {
          dts[element.data] = {'marked': true};
        });
        //console.log(dts);
        setDatas(dts);    
      }else{
        
      }     
    })
    .catch((error) => {
      
    });    
  }

  async function getAudiencias(data){
    //console.log(data.dateString);

    let result = await  SecureStore.getItemAsync('token');    
    
    fetch(env.default.url+'audiencias/'+data.dateString+'/where',{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+result
      }
    }).then((response) => response.json())
    .then((json) => {    
      //console.log(json);            
      if(json){        
        //console.log(json.estado_civil);
        setAudiencias(json);
       
      }else{
        //console.log(json);
      }     
    })
    .catch((error) => {
      
    });    
  }

  return (
    <SafeAreaView style={styles.container}>       
        <View style={styles.containerTitle}>  
            <Text style={styles.title}>Calendário</Text> 
        </View> 
        <View style={styles.containerBody}>
       
        
          <Calendar 
          theme={{

            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
          
          }}
            markedDates={
              Object.keys(datas).length ? datas : null
            }         
            onDayPress={day => {
              getAudiencias(day);
            }}
            onMonthChange={month => {
              changeMonth(month.month, month.year);
            }}
          />
       
        <FlatList style={styles.list}
              data={audiencias}
              renderItem={({item})=>{
                return <Itens                   
                  processo={item.processo_id}     
                  autor={item.processo?.autor.nome}                          
                  codigo={item.processo?.codigo}  
                  natureza={item.processo?.natureza.nome}
                  vara={item.processo?.vara?.nome}
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
        
    </SafeAreaView>
  );
}