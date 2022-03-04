import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContent: {
        width: '95%',
        height: 'auto',
        backgroundColor: '#F5F5F6',
        marginLeft: '3%',
        marginBottom: 15,
        borderRadius: 10,
       
        alignItems: 'center',
        padding: 10,
      
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
    infoContent: {
        marginTop: 10,
        width: '100%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContent: {
        width: '100%',
        alignItems: 'flex-start',
    },
    contextLeft: {
        width: '50%',
        height: '100%',
        alignItems: 'flex-start',
    },
    boxInfo: {        
        
    },    
    info1: {
        marginLeft: 10,
        fontSize: 14,
        color: '#000000',
        fontWeight: 'bold',
    },
    info2: {
        marginLeft: 10,
        fontSize: 20,
        color: '#611215',
        fontWeight: 'bold',
    },
    contextRight: {
        width: '50%',
        alignItems: 'flex-end',
    },   
    info3: {
        marginRight: 5,
        fontSize: 16,
        color: '#000000',
        fontWeight: 'bold',
    },
    info4: {
        marginRight: 5,
        fontSize: 12,
        color: '#c62828',
        fontWeight: 'bold',
    },
    btndel:{
        borderRadius: 50,
        width: 30,
        height: 30,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 2,
    },
    confirmdel: {
        color: '#c62828'
    }
});

export default styles;