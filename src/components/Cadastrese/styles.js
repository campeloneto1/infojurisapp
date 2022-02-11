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
      height: '90%',
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
    containerScrow: {
      width: '100%',
      height: '100%',
      
    },
    containerForms: {
      marginTop: 20,
      width: '100%',
      height: '100%',
      alignItems: 'center',
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
});

export default styles;