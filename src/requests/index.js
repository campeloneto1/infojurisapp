import * as SecureStore from 'expo-secure-store';
import * as env from '../environments/';

 export function request(url, data, tipo){
    let result = await  SecureStore.getItemAsync('token'); 
    
    if(tipo == 1){
        
        fetch(env.default.url+url,{
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+result
            }
          }).then((response) => response.json())
          .then((json) => {                   
            if(json){                
              return json;        
            }else{
                return 2;     
            }     
          })
          .catch((error) => {
            return 2;   
          });

    }

    if(tipo == 2){

        fetch(env.default.url+url,{
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+result
            },
            body: data
          }).then((response) => response.json())
          .then((json) => {     
            //console.log(json);
            if(json){
              //console.log(json);
              if(json == 1){
                return 1;
              }
            }else{
                return 2;
            }     
          })
          .catch((error) => {
            return 2;
          });

    }
    
    
}