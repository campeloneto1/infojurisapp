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
    },    
    
});

export default styles;