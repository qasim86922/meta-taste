import React,{useState} from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';
export default function inputs(props){
return(
  <View>
  {props.placeholder=='Medical' || props.placeholder == 'Area'?<Text></Text>:
   <View style={styles.textInput}>
    <TextInput
    placeholder={props.placeholder}
    autoCapitalize="none"
    style={styles.textInput}
    
    onChangeText    ={(e)=>props.onHandleChange}
    value={props.value}
  />
  </View>
}
</View>
)

}

// const styles = StyleSheet.create({
// textInput:{
//     flexDirection: 'row',
//     justifyContent:"space-around",
//     alignItems: 'stretch',
//     margin: 15,
//     height: 40,
//     borderColor: '#7a42f4',
//     borderWidth: 1
// }

// })
const styles = StyleSheet.create({
  textInput: {
  flexDirection:'row',
  flex:1,  
    // width: 350,
   
    // height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})