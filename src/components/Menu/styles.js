import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,      
      alignItems: 'center',
      backgroundColor: '#611215'
      
    },
    
    title: {                   
      color: '#611215',
      fontSize: 30,
      fontWeight: "bold",
      marginTop: 30,
      
    },
    containerBody:{
      width: '100%',    
      height: '100%',
      position: 'absolute',
      bottom: 0,
      backgroundColor: '#E1E2E1',
      alignItems: 'center',
      
        shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,
    },    
    containerMenus:{
      width: '90%',    
      height: '90%',
      position: 'absolute',
      bottom: 0,

      paddingTop: 10,
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      flexDirection: 'row',
    },  
    menu: {
      backgroundColor: '#ffffff',
      height: 100,
      width: '40%',
      borderRadius: 10,

      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,

      elevation: 8,
    },
    textmenu: {
      color: '#611215',
      fontWeight: 'bold',
      fontSize: 20,
      

    },
    
});

export default styles;