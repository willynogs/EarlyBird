import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from './src/actions';
import firebase from 'react-native-firebase';
import AuthTabs from './src/navigation/AuthTabs';
import Tabs from './src/navigation/Tabs';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.unsubscriber = null;

    this.state = {
      loggedIn: false
    };
  }

  componentDidMount() {
    const { setUser } = this.props;

    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      user ? this.setState({ loggedIn: true }) : this.setState({ loggedIn: false });
      setUser(user._user);
    });

    firebase.database().goOnline();
  }

  componentWillUnmount() {
    if(this.unsubscriber) {
      this.unsubscriber();
    }

    firebase.database().goOffline();
  }

  render() {
    const { loggedIn } = this.state;
    const { user } = this.props;

    return (
      <View style={{ flex: 1, paddingTop: 25 }}>
        {loggedIn ? <Tabs /> : <AuthTabs />}
      </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
