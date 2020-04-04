import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image } from 'react-native'
import styles from './style'
import * as firebase from 'firebase';


export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    const myUsers = firebase.database().ref("fatimafyp");
    myUsers.on("value",datasnap=>{
      console.log(datasnap.val())
    })
    
    console.log('handleLogin')
  }
  
  render() {
    return (
      <View style={styles.container}>
	<Image style={{width:50 , height:50}}
		       source={require('./logo.jpeg')} /> 
        <Text style={{color:'green', fontSize: 40}}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'green' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Login" color="green" onPress={this.handleLogin} />
        <View>
        <Text> Don't have an account? <Text onPress={() => this.props.navigation.navigate('Signup')} style={{color:'green', fontSize: 18}}> Sign Up </Text></Text>
        </View>
      </View>
    )
  }
}