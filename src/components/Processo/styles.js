import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,      
      alignItems: 'center',
      backgroundColor: '#611215'
      
    },
    containerTitle: {
      width: '100%',    
      height: 150,
      alignItems: 'center',
      marginTop: 30,
      
    },
    title: {             
      alignItems: 'center',
      color: '#E1E2E1',
      fontSize: 30,
      fontWeight: "bold",
    },
    voltar: {
      position: 'absolute',
      top: 5,
      left: 10,
    },
    containerBody:{
      width: '100%',    
      height: '85%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#E1E2E1',
      borderTopRightRadius: 50,
      borderTopLeftRadius: 50,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
      alignItems: 'center',
    },    
    containerText:{
      marginTop: 30,
      width: '95%',
      height: '100%',
    },
    containerText2:{     
      width: '100%',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    containerText3:{     
      width: '45%',
     
    },
    containerText31:{     
      width: '45%',
      alignItems: 'flex-end',
    },
    containerText4:{     
      width: '30%',
      alignItems: 'center'
    },
    containerText5:{     
     marginLeft: 10,
     alignItems: 'center'
    },
    containerText6:{    
      marginTop: 20, 
      width: '100%',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      flexDirection: 'row',
    },
    label:{
      marginTop: 10,
      fontSize: 18,
      fontWeight: "bold",
      color: '#611215',
    },
    label2:{
      marginBottom: 20,
      fontSize: 20,
      fontWeight: "bold",
      color: '#611215',
    },
    textlabel:{
      fontSize: 15,
    },

    centeredView: {      
      marginTop: '50%'
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    
    modalClose: {
      color: "#611215",
      fontWeight: "bold",
      textAlign: "center",
      marginTop: 30
    },
    containerTextModal: {
      marginTop: 10, 
      width: '100%',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      flexDirection: 'row',

    },
    containerTextModal2: {
      marginTop: 10, 
      width: '100%',
      justifyContent: 'flex-start',
      marginLeft: 10,

    },
    containerText2Modal: {
      width: '45%',

    },
    titleModal: {
      color: "#611215",
      fontWeight: "bold",
      marginBottom: 15,
      textAlign: "center",
      fontSize: 20,
    },
    labelModal: {
      color: "#611215",
      fontWeight: "bold",      
      fontSize: 15,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    },
});

export default styles;