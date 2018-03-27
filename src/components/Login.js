import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import Header from './Header';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    const { container, sectionHeader, inputStyle } = styles;

    return (
      <View style={container}>
        <Text style={sectionHeader}>WELCOME BACK</Text>

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

        <TouchableOpacity onPress={this.handleLogin.bind(this)}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }

  handleLogin() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response) => {
      console.log(response);
    }).catch((e) => {
      console.log(e);
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 25
  },
  sectionHeader: {
    fontSize: 30,
    color: '#eb685b',
    fontWeight: '200'
  },
  inputStyle: {
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: '#666',
    marginBottom: 10,
    paddingVertical: 5,
    paddingHorizontal: 10
  }
});

export default Login;
