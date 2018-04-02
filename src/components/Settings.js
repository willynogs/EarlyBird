import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { outerContainer, buttonContainer, sectionHeading } = styles;
    const { navigate } = this.props.navigation;

    return (
      <View style={outerContainer}>
        <TouchableOpacity onPress={() => navigate('TrafficConfig')} style={buttonContainer}>
          <Text style={sectionHeading}>SET WORK LOCATION</Text>
          <Ionicons name='ios-arrow-round-forward' size={30} style={{ color: '#eb685b' }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('WeatherConfig')} style={buttonContainer}>
          <Text style={sectionHeading}>SET WEATHER LOCATION</Text>
          <Ionicons name='ios-arrow-round-forward' size={30} style={{ color: '#eb685b' }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('NewsConfig')} style={buttonContainer}>
          <Text style={sectionHeading}>CONFIGURE NEWS</Text>
          <Ionicons name='ios-arrow-round-forward' size={30} style={{ color: '#eb685b' }} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => firebase.auth().signOut()} style={buttonContainer}>
          <Text style={sectionHeading}>SIGN OUT</Text>
          <Ionicons name='ios-arrow-round-forward' size={30} style={{ color: '#eb685b' }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 25
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  sectionHeading: {
    fontSize: 25,
    color: '#eb685b',
    fontWeight: '200'
  }
});

export default Settings;
