import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';
import firebase from 'react-native-firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as weather from '../lib/weather';

class Weather extends Component {
  constructor(props) {
    super(props);

    this.ref = null;
    this.state = {
      loading: true,
      weather: {}
    };
  }

  getWeather(latitude, longitude) {
    weather.get(latitude, longitude)
    .then(response => {
      this.setState({ loading: false, weather: response });
    }).catch(e => {
      console.log(e);
    });
  }

  componentWillMount() {
    const { uid } = this.props.user;
    const { latitude, longitude } = this.props.user.coords;
    this.ref = firebase.database().ref(`weather/${uid}`);
    this.ref.on('value', (snap) => {
      const { _value } = snap;
      if(_value) {
        const json = JSON.parse(_value);
        this.getWeather(json.lat, json.lng);
      } else {
        this.getWeather(latitude, longitude);
      }
    });
  }

  render() {
    return (
      <View>
        {this.showLoading()}
      </View>
    );
  }

  showLoading() {
    const { loading, weather } = this.state;
    const { weatherHeader, weatherContainer, weatherLocation, textContainer } = styles;

    if(loading) {
      return (
        <View><Text>Loading</Text></View>
      );
    }

    return (
      <View>
        <Text style={weatherHeader}>WEATHER</Text>
        <View style={weatherContainer}>
          <Ionicons name='ios-sunny' size={50} />
          <View style={textContainer}>
            <Text style={weatherLocation}>{weather.name}</Text>
            <Text>{weather.main.temp}°F</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  weatherHeader: {
    fontSize: 30,
    color: '#eb685b',
    fontWeight: '200'
  },
  weatherLocation: {
    fontSize: 20,
    fontWeight: '600'
  },
  textContainer: {
    justifyContent: 'center',
    marginHorizontal: 10
  }
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(Actions, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
