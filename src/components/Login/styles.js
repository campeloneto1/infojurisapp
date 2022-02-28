import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,      
      alignItems: 'center',
      //backgroundColor: '#E1E2E1'
      backgroundColor: '#611215',      
    },
    container2:{      
      width: '100%',
      height: '100%',   
      flex: 1,      
      alignItems: 'center',
    },
    containerLogo:{      
      alignItems: 'center',
      width: '100%',
      height: '20%',    
    },
    title: {   
      marginTop: 60,          
        alignItems: 'center',                
        color: '#ffffff',
        fontSize: 35,
        fontWeight: "bold",
   },
    logo: {      
      width: 100,
      height: 100,
      marginTop: 30,
    },
    containerForm: {   
      paddingTop: 30,
      marginTop: 50,       
      height: '45%',
      width: '90%', 
      maxWidth: 500,
      alignItems: 'center',
      backgroundColor: '#E1E2E1',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,
    },
    input:{
      width: "70%",

      //borderRadius: 50,
      backgroundColor: "#E1E2E1",
      textAlign: 'center',
      height:50,
      margin: 12,
      
      borderBottomWidth: 1,
      borderColor: "#611215",
   },
   textForm: {
      marginTop: 25,
      fontWeight: 'bold',
      fontSize: 20,
      color: '#611215',
   },
   labelForm: {
      marginTop: 40,
      fontWeight: 'bold',
      fontSize: 15,
      color: '#611215'
   },
   
   button:{
      marginTop: 50,
      backgroundColor: '#611215',
      width: '90%',
      paddingTop: 14,
      paddingBottom: 14,
      borderRadius: 50,
      alignItems: "center",
      justifyContent: "center",

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,
   },
   textButton:{
      color: "#ffffff",
      fontWeight: 'bold',
      fontSize: 20,
   },
   erroLogin:{
      color: "#611215",
      fontWeight: 'bold',
      fontSize: 15,
   }
});

export default styles;