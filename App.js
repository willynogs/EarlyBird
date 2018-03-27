import React from 'react';
import { StyleSheet, View } from 'react-native';
import firebase from 'react-native-firebase';
import AuthTabs from './src/navigation/AuthTabs';
import Tabs from './src/navigation/Tabs';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.unsubscriber = null;

    this.state = {
      user: null
    };
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    if(this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    const { user } = this.state;

    return (
      <View style={{ flex: 1, paddingTop: 25 }}>
        {user ? <Tabs /> : <AuthTabs />}
      </View>
    );
  }
}

export default App;
