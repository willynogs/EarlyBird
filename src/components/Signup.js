import React, { Component } from 'react';
import { KeyboardAvoidingView, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import Toast from 'react-native-root-toast';
import Header from './Header';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    const { container, sectionHeader, inputStyle, authButton, authButtonText } = styles;

    return (
      <KeyboardAvoidingView behavior={'position'} style={container}>
        <Text style={sectionHeader}>SIGN UP</Text>

        <TextInput
          style={inputStyle}
          placeholder='Email'
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })} />

        <TextInput
        style={inputStyle}
          placeholder='Password'
          value={this.state.password}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })} />

        <TouchableOpacity style={authButton} onPress={this.handleSignup.bind(this)}>
          <Text style={authButtonText}>SIGN UP</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }

  handleSignup() {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response);
    }).catch((e) => {
      let toast = Toast.show(String(e), {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: false,
        animation: true
      });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 25
  },
  sectionHeader: {
    fontSize: 30,
    textAlign: 'center',
    color: '#eb685b',
    fontWeight: '200',
    marginBottom: 20
  },
  inputStyle: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 7,
    minWidth: '90%',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 18
  },
  authButton: {
    backgroundColor: '#eb685b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    paddingVertical: 12,
    paddingHorizontal: 10
  },
  authButtonText: {
    color: '#FFF'
  }
});

export default Signup;
