import React from 'react'
import { StyleSheet, Text, TextInput, Image,View, Button, TouchableOpacity  } from 'react-native'
import Input from './TextInputs'

export default class signUp extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleSignUp = () => {
    // TODO: For Firebase athu
    console.log('handleSignUp')
  }
handleInput =(name,e)=>{
this.setState({[name]:e})
}
render() {
    return (
      
      <View style={styles.container}>
        {/* <Image style={{width:50 , height:50}}
        source={require('./logo.jpeg')} /> */}
      
      <View>
      <Text style={{color:'green', fontSize: 40,flexDirection:'row',justifyContent:'space-around',alignItems:'flex-start' }}>Sign Up</Text>
      </View>

      <View>
         <Input 
         placeholder='Enter your First Name'
         value = {this.state.fName}
         onHandleChange = {(e)=>this.handleInput('fName',e)}
         />
         </View>

         <View>
 <Input 
         placeholder='Enter your Last Name'
         value = {this.state.lName}
         onHandleChange = {(e)=>this.handleInput('lName',e)}
         />
         </View>

         <View style = {styles.ageContainer}>
         <View style = {styles.age}> 
           <Input 
         placeholder='Age'
         value = {this.state.age}
         onHandleChange = {(e)=>this.handleInput('age',e)}
         />
         </View>
<View style = {styles.dob}>
   <Input 
         placeholder='dd/mm/yy'
         value = {this.state.dob}
         onHandleChange = {(e)=>this.handleInput('dob',e)}
         />
         </View>

         </View>
         <View>
        <Button title="Sign Up" color="green" onPress    ={this.handleSignUp}/>
        </View>
        <View>
        <Text> Already have an account? <Text onPress    ={() => this.props.navigation.navigate('login')} style={{color:'green', fontSize: 18}}> Login </Text></Text>
        </View>
      </View>
    )
  }
  
}
const styles = StyleSheet.create({
  container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
  }
  ,
  ageContainer:{
    flexDirection: 'row'
  },
  age:{
    flex : 2
  },
  dob:{
flex :3
  }
})