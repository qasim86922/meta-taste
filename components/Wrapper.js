import React, { Component } from 'react';
import { View, TextInput, Image, Animated, Keyboard, KeyboardAvoidingView } from 'react-native';
//import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL } from './styles';
// import logo from './logo.png';

class Wrapper extends Component {
  constructor(props) {
    super(props);

    this.imageHeight = new Animated.Value(IMAGE_HEIGHT);
  }

  componentWillMount () {
    this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
    this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
  }

  componentWillUnmount() {
    this.keyboardWillShowSub.remove();
    this.keyboardWillHideSub.remove();
  }

  keyboardWillShow = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT_SMALL,
    }).start();
  };

  keyboardWillHide = (event) => {
    Animated.timing(this.imageHeight, {
      duration: event.duration,
      toValue: IMAGE_HEIGHT,
    }).start();
  };

  render() {
    return (
      <KeyboardAvoidingView
        // style={styles.container}
        behavior="padding"
      >
        
      </KeyboardAvoidingView>
    );
  }
};

export default Wrapper;