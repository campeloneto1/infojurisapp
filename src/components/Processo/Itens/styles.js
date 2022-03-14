import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContent: {
        marginTop: 10,
        width: '95%',
        height: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        
        marginBottom: 10,
    },
    contextLeft: {
        width: '50%',
        height: '100%',
        alignItems: 'flex-start',
    },
    contextRight: {
        width: '50%',
        alignItems: 'flex-end',
    }, 
    info1: {
        marginLeft: 10,
        fontSize: 15,
       
        fontWeight: 'bold',
    },
    info2: {
        marginLeft: 10,
        fontSize: 15,
    },
    info3: {
        marginLeft: 10,
        fontSize: 15,
        color: 'blue',
    },
});

export default styles;