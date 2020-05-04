/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * 
 */
import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native'
import { NavigationEvents } from 'react-navigation'
import Login from './login';
import signUp from './signup';

const car1= './logo.jpeg';
export default class Loading extends React.Component {

componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Signup')
    }, 2000)
    
}
  render() {
    return (
      <View style={styles.container}>
    <Image style={{width:50 , height:50}}
    source={require(car1)} />
		<Text style={{color:'green', fontSize: 25}}>Meta Taste</Text><ActivityIndicator color='#e93766' size="small" />
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
})
